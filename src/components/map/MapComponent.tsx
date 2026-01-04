import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { VenueData } from '@/components/venue/VenueCard';
import { PersonData } from '@/components/social/PersonCard';
import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

// Fix for default Leaflet markers in webpack/vite
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapComponentProps {
  venues?: VenueData[];
  people?: PersonData[];
  className?: string;
}

function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}

export function MapComponent({ venues = [], people = [], className = "h-[400px] w-full rounded-xl" }: MapComponentProps) {
  const navigate = useNavigate();
  // Default center (Bangalore based on mock data text)
  const defaultCenter: [number, number] = [12.9352, 77.6245]; // Koramangala coordinates
  const [center, setCenter] = useState<[number, number]>(defaultCenter);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  // Helper to generate random offset for demo purposes since mock data doesn't have coords
  const getRandomOffset = () => (Math.random() - 0.5) * 0.02;

  // Memoize offsets to keep positions stable relative to center
  const venueOffsets = useMemo(() => {
    return venues.map(v => ({
      id: v.id,
      latOffset: getRandomOffset(),
      lngOffset: getRandomOffset()
    }));
  }, [venues]);

  const personOffsets = useMemo(() => {
    return people.map(p => ({
      id: p.id,
      latOffset: getRandomOffset(),
      lngOffset: getRandomOffset()
    }));
  }, [people]);

  const createIcon = (image: string, name: string) => {
    return L.divIcon({
      className: 'custom-icon',
      html: `<div class="flex flex-col items-center">
               <div class="h-10 w-10 rounded-full border-2 border-white overflow-hidden shadow-lg bg-white">
                 <img src="${image}" alt="${name}" class="h-full w-full object-cover" />
               </div>
               <span class="mt-1 text-xs font-bold bg-white/90 px-1 rounded shadow-sm whitespace-nowrap">${name}</span>
             </div>`,
      iconSize: [40, 60],
      iconAnchor: [20, 60],
      popupAnchor: [0, -60]
    });
  };

  return (
    <div className={className}>
      <MapContainer center={defaultCenter} zoom={14} scrollWheelZoom={false} className="h-full w-full rounded-xl z-0">
        <MapController center={center} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {venues.map((venue) => (
          <Marker
            key={`venue-${venue.id}`}
            position={[venue.coordinates.lat, venue.coordinates.lng]}
            icon={createIcon(venue.image, venue.name)}
            eventHandlers={{
                click: () => navigate(`/hotel/${venue.id}`),
            }}
          >
            <Popup>
              <div className="text-sm font-semibold">{venue.name}</div>
              <div className="text-xs">{venue.cuisine}</div>
            </Popup>
          </Marker>
        ))}

        {people.map((person) => (
          <Marker
            key={`person-${person.id}`}
            position={[person.coordinates.lat, person.coordinates.lng]}
            icon={createIcon(person.image, person.name)}
            eventHandlers={{
                click: () => navigate(`/user/${person.id}`),
            }}
          >
            <Popup>
              <div className="text-sm font-semibold">{person.name}</div>
              <div className="text-xs">{person.interests.join(', ')}</div>
            </Popup>
          </Marker>
        ))}
        {venues.map((venue, index) => {
          const offset = venueOffsets[index];
          return (
            <Marker
              key={`venue-${venue.id}`}
              position={[center[0] + offset.latOffset, center[1] + offset.lngOffset]}
              icon={createIcon(venue.image, venue.name)}
              eventHandlers={{
                  click: () => navigate(`/hotel/${venue.id}`),
              }}
            >
              <Popup>
                <div className="text-sm font-semibold">{venue.name}</div>
                <div className="text-xs">{venue.cuisine}</div>
              </Popup>
            </Marker>
          );
        })}

        {people.map((person, index) => {
          const offset = personOffsets[index];
          return (
            <Marker
              key={`person-${person.id}`}
              position={[center[0] + offset.latOffset, center[1] + offset.lngOffset]}
              icon={createIcon(person.avatar, person.name)}
              eventHandlers={{
                  click: () => navigate(`/user/${person.id}`),
              }}
            >
              <Popup>
                <div className="text-sm font-semibold">{person.name}</div>
                <div className="text-xs">{person.interests.join(', ')}</div>
              </Popup>
            </Marker>
          );
        })}

        {/* Current Location */}
        <Marker position={center}>
             <Popup>You are here</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
