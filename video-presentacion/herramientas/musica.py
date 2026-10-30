"""Música de fondo original para el video (sin licencias de terceros).

Pop institucional tranquilo en Re mayor, 92 BPM, progresión I–V–vi–IV.
Se genera a la duración exacta del video y termina en un acorde final.
Deja libre la zona media de frecuencias para que la voz se entienda.

Uso: python herramientas/musica.py <segundos> <salida.wav>
"""

import sys
import wave

import numpy as np

SR = 44100
BPM = 92
BEAT = 60 / BPM
BAR = 4 * BEAT
rng = np.random.default_rng(1872)  # semilla fija: misma música en cada armado


def hz(midi):
    return 440.0 * 2 ** ((midi - 69) / 12)


# Re mayor: D, A, Bm, G (notas MIDI de cada acorde, sin octava)
ACORDES = [
    (62, 66, 69),  # D
    (57, 61, 64),  # A
    (59, 62, 66),  # Bm
    (55, 59, 62),  # G
]


def env_adsr(n, a, r, sustain_level=1.0):
    e = np.full(n, sustain_level)
    na, nr = int(a * SR), int(r * SR)
    na, nr = min(na, n), min(nr, n)
    if na:
        e[:na] = np.linspace(0, sustain_level, na) ** 1.5
    if nr:
        e[-nr:] *= np.linspace(1, 0, nr) ** 2
    return e


def pad_voz(f, dur, detune_cents=7, brillo=1.6):
    """Diente de sierra aditivo, desafinado, con armónicos suavizados."""
    n = int(dur * SR)
    t = np.arange(n) / SR
    out_l = np.zeros(n)
    out_r = np.zeros(n)
    for i, cents in enumerate((-detune_cents, 0, detune_cents)):
        ff = f * 2 ** (cents / 1200)
        k_max = max(1, int(3800 / ff))
        fase = rng.uniform(0, 2 * np.pi)
        s = np.zeros(n)
        for k in range(1, min(k_max, 14) + 1):
            s += np.sin(2 * np.pi * k * ff * t + fase * k) / k**brillo
        if i == 0:
            out_l += s
        elif i == 2:
            out_r += s
        else:
            out_l += 0.6 * s
            out_r += 0.6 * s
    # vibrato de amplitud lento para que respire
    lfo = 1 + 0.08 * np.sin(2 * np.pi * 0.23 * t + rng.uniform(0, 6))
    return out_l * lfo, out_r * lfo


def pluck(f, dur=1.4):
    """Tipo kalimba/marimba: armónicos que decaen más rápido cuanto más agudos."""
    n = int(dur * SR)
    t = np.arange(n) / SR
    s = np.zeros(n)
    for k, amp in ((1, 1.0), (2, 0.32), (3, 0.12), (4, 0.06), (6, 0.025)):
        s += amp * np.sin(2 * np.pi * k * f * t) * np.exp(-t * (3.2 + 2.6 * k))
    ataque = np.minimum(1, t / 0.004)
    return s * ataque


def bajo(f, dur):
    n = int(dur * SR)
    t = np.arange(n) / SR
    s = np.sin(2 * np.pi * f * t) + 0.18 * np.sin(2 * np.pi * 2 * f * t)
    return s * env_adsr(n, 0.02, 0.25) * (0.75 + 0.25 * np.exp(-t * 3))


def bombo(dur=0.45):
    n = int(dur * SR)
    t = np.arange(n) / SR
    f = 44 + 80 * np.exp(-t * 28)
    fase = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(fase) * np.exp(-t * 9) * np.minimum(1, t / 0.002)


def ruido_filtrado(n, f_lo, f_hi):
    x = rng.standard_normal(n)
    X = np.fft.rfft(x)
    fr = np.fft.rfftfreq(n, 1 / SR)
    X *= ((fr > f_lo) & (fr < f_hi)).astype(float)
    y = np.fft.irfft(X, n)
    return y / (np.abs(y).max() + 1e-9)


SHAKER = ruido_filtrado(int(0.06 * SR), 6000, 14000) * np.exp(-np.arange(int(0.06 * SR)) / SR * 70)
SNAP = ruido_filtrado(int(0.18 * SR), 1200, 5000) * np.exp(-np.arange(int(0.18 * SR)) / SR * 30)


def eq_fft(x, curva):
    X = np.fft.rfft(x)
    fr = np.fft.rfftfreq(len(x), 1 / SR)
    return np.fft.irfft(X * curva(fr), len(x))


def reverb(l, r, segundos=2.6, mezcla=0.28):
    n_ir = int(segundos * SR)
    t = np.arange(n_ir) / SR
    caida = np.exp(-t * 6.9 / segundos)
    irs = []
    for _ in range(2):
        ir = rng.standard_normal(n_ir) * caida
        # Sin graves en la cola: el ruido del IR desbalancea L/R en graves
        ir = eq_fft(ir, lambda fr: 1 / (1 + (fr / 4500) ** 2) / np.sqrt(1 + (250 / np.maximum(fr, 1)) ** 4))
        ir[: int(0.012 * SR)] = 0  # pre-delay
        irs.append(ir / np.sqrt(np.sum(ir**2)))
    n = len(l) + n_ir
    tam = 1 << (n - 1).bit_length()
    sal = []
    for canal, ir in zip((l, r), irs):
        y = np.fft.irfft(np.fft.rfft(canal, tam) * np.fft.rfft(ir, tam), tam)[: len(l)]
        sal.append((1 - mezcla) * canal + mezcla * y)
    return sal


def componer(duracion):
    n_total = int(duracion * SR)
    L = np.zeros(n_total + SR * 4)
    R = np.zeros_like(L)

    def poner(sig, t0, gan=1.0, pan=0.0):
        i = int(t0 * SR)
        if i >= len(L):
            return
        j = min(len(L), i + len(sig))
        L[i:j] += sig[: j - i] * gan * np.sqrt(0.5 * (1 - pan))
        R[i:j] += sig[: j - i] * gan * np.sqrt(0.5 * (1 + pan))

    def poner_st(sl, sr, t0, gan=1.0):
        i = int(t0 * SR)
        j = min(len(L), i + len(sl))
        L[i:j] += sl[: j - i] * gan
        R[i:j] += sr[: j - i] * gan

    # El último compás es el acorde final sostenido.
    compases = max(8, int(round((duracion - 3.5) / BAR)))
    fin_musica = compases * BAR
    # Patrón de arpegio en corcheas (índices dentro del acorde, -1 = silencio)
    arpegio = [0, 2, 1, 2, 0, 2, 1, 2]
    arpegio_b = [0, 1, 2, 1, 2, 1, 0, 2]

    for c in range(compases):
        t0 = c * BAR
        acorde = ACORDES[c % 4]
        seccion = "intro" if c < 4 else ("a" if (c // 8) % 2 == 0 else "b")
        if compases - c <= 2:
            seccion = "salida"

        # Pad: acorde en registro medio-grave, con raíz una octava abajo
        for nota in (acorde[0] - 12, acorde[1], acorde[2]):
            sl, sr = pad_voz(hz(nota), BAR + 1.2)
            e = env_adsr(len(sl), 0.9, 1.3)
            poner_st(sl * e, sr * e, t0, gan=0.05)

        # Arpegio agudo (dos octavas arriba): lejos de la voz
        patron = arpegio if seccion != "b" else arpegio_b
        for i, idx in enumerate(patron):
            if seccion == "intro" and i % 2:
                continue
            nota = acorde[idx] + 24 + (12 if (seccion == "b" and i == 7) else 0)
            gan = 0.10 if i % 2 == 0 else 0.07
            poner(pluck(hz(nota)), t0 + i * BEAT / 2, gan=gan, pan=(0.35 if (i // 2) % 2 == 0 else -0.35))

        if seccion in ("a", "b", "salida"):
            # Bajo en la raíz, negras con un empuje en la corchea del 4
            raiz = hz(acorde[0] - 24)
            for b in (0, 1, 2, 3):
                poner(bajo(raiz, BEAT * 0.9), t0 + b * BEAT, gan=0.15)
            poner(bajo(raiz, BEAT * 0.4), t0 + 3.5 * BEAT, gan=0.09)
            # Bombo suave en 1 y 3
            for b in (0, 2):
                poner(bombo(), t0 + b * BEAT, gan=0.24)
            # Shaker en semicorcheas, acentuado en contratiempo
            for s in range(16):
                poner(SHAKER, t0 + s * BEAT / 4, gan=0.035 if s % 2 else 0.018, pan=0.25)
        if seccion == "b":
            for b in (1, 3):
                poner(SNAP, t0 + b * BEAT, gan=0.05, pan=-0.1)

    # Acorde final: D mayor abierto, largo
    t_fin = fin_musica
    for nota in (50, 57, 62, 66, 69):
        sl, sr = pad_voz(hz(nota), 5.0)
        e = env_adsr(len(sl), 0.05, 4.2)
        poner_st(sl * e, sr * e, t_fin, gan=0.055)
    for i, nota in enumerate((74, 78, 81, 86)):
        poner(pluck(hz(nota), dur=3.0), t_fin + i * 0.09, gan=0.09, pan=(-0.3 + 0.2 * i))
    poner(bajo(hz(38), 3.0), t_fin, gan=0.18)
    poner(bombo(), t_fin, gan=0.25)

    L, R = L[:n_total], R[:n_total]
    L, R = reverb(L, R)

    # EQ: recorta graves sucios y deja un hueco suave en 1–3 kHz para la voz
    def curva(fr):
        hp = 1 / np.sqrt(1 + (35 / np.maximum(fr, 1)) ** 4)
        hueco = 1 - 0.35 * np.exp(-((np.log2(np.maximum(fr, 1) / 1800)) ** 2) / 0.8)
        return hp * hueco

    L, R = eq_fft(L, curva), eq_fft(R, curva)

    # Fundido de entrada corto y de salida en el último segundo y medio
    t = np.arange(n_total) / SR
    fade = np.minimum(1, t / 1.2) * np.clip((duracion - t) / 1.5, 0, 1)
    L, R = L * fade, R * fade

    est = np.stack([L, R], axis=1)
    est = np.tanh(est * 1.2) / 1.2
    est /= np.abs(est).max() + 1e-9
    return est * 0.89


def main():
    duracion = float(sys.argv[1])
    salida = sys.argv[2]
    audio = componer(duracion)
    pcm = (audio * 32767).astype("<i2")
    with wave.open(salida, "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())
    print(f"musica: {duracion:.1f}s -> {salida}")


if __name__ == "__main__":
    main()
