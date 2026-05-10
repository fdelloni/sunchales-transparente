/**
 * @deprecated Reemplazado en Fase 3 por `MapaLeafletSunchales`.
 *
 * Este componente era el mapa SVG inline de Fase 2. En Fase 3 lo sustituimos
 * por un mapa Leaflet con tiles OSM y overlays GeoJSON de las mismas manzanas
 * IPEC. El archivo se mantiene sólo para no romper imports antiguos durante
 * la transición. Se puede borrar con seguridad cuando ya no aparezca en
 * ningún `git log` reciente.
 */
import MapaLeafletSunchales from "./MapaLeafletSunchales";

export default function MapaManzanasSunchales() {
  return <MapaLeafletSunchales />;
}
