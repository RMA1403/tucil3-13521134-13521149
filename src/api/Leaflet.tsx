import { LatLng, LatLngExpression } from "leaflet";
import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Polyline,
} from "react-leaflet";
import { coordinate, mapEdge } from "../classes/Graph";

interface markerProps {
  addNode: (coord: coordinate) => void;
  addEdge: (edge: mapEdge) => void;
}

function Markers({ addNode, addEdge }: markerProps): JSX.Element {
  const [posArr, setPosArr] = useState<LatLng[]>([]);
  const [currPos, setCurrPos] = useState<LatLng>();
  const [polyArr, setPolyArr] = useState<LatLngExpression[][]>([]);
  const [currIdx, setCurrIdx] = useState<number>(0);

  useMapEvents({
    click(e) {
      if (posArr.length > 0 && currPos) {
        setPolyArr([
          ...polyArr,
          [
            [currPos.lat, currPos.lng],
            [e.latlng.lat, e.latlng.lng],
          ],
        ]);
        const edge: mapEdge = {
          source: currIdx,
          dest: posArr.length,
          sourceCoord: {
            lat: posArr[currIdx].lat,
            long: posArr[currIdx].lng,
          },
          destCoord: {
            lat: e.latlng.lat,
            long: e.latlng.lng,
          },
        };
        addEdge(edge);
      } else if (posArr.length === 0) {
        setCurrPos(e.latlng);
      }
      setPosArr([...posArr, e.latlng]);
      const coord: coordinate = {
        long: e.latlng.lng,
        lat: e.latlng.lat,
      };
      addNode(coord);
    },
  });

  return (
    <>
      {posArr.map((pos, idx) => (
        <Marker
          key={idx}
          position={pos}
          eventHandlers={{
            click: (e) => {
              setCurrPos(e.latlng);
              setCurrIdx(idx);
            },
          }}
        ></Marker>
      ))}
      {polyArr.map((opt, idx) => (
        <Polyline positions={opt} key={idx} />
      ))}
    </>
  );
}

export default function Map({ addNode, addEdge }: markerProps): JSX.Element {
  return (
    <MapContainer
      center={[-6.893127, 107.610386]}
      zoom={16}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Markers addNode={addNode} addEdge={addEdge}></Markers>
    </MapContainer>
  );
}
