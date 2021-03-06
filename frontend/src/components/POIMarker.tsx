import Api from 'helper/api';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { setDestination } from 'ducks/locationsSlice';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'ducks/store';
import { allIcons } from 'assets/icons';

export type POI = GeoJSON.Feature<
  GeoJSON.Point,
  { id: number; name: string; fclass: string; iconNumber: number }
>;

export function POIMarker() {
  const api = new Api();
  const dispatch = useDispatch();
  const points = useSelector((state: RootState) => state.POI);

  const handleFindPath = (p: POI) => {
    dispatch(
      setDestination({
        loc: { lat: p.geometry.coordinates[1], lng: p.geometry.coordinates[0] },
        isNew: false,
      })
    );
  };

  return (
    <>
      {points.map((p) => {
        const loc = [...p.geometry.coordinates];
        return (
          <Marker
            key={p.properties.id}
            position={L.latLng(loc.reverse() as [number, number])}
            icon={allIcons[p.properties.iconNumber]}
          >
            <Popup>
              <div>
                <h3>
                  {p.properties.name} ({p.properties.fclass})
                </h3>
                <Button size="small" onClick={() => handleFindPath(p)}>
                  Veiviser
                </Button>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}
