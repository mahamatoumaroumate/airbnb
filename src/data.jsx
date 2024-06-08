const continents = ['Europe', 'Asia', 'Africa', 'North America']
import {
  FaCrown,
  FaTractor,
  FaLeaf,
  FaUmbrellaBeach,
  FaSwimmingPool,
  FaFortAwesome,
  FaTree,
  FaList,
} from 'react-icons/fa'

export const categories = [
  { name: 'All', icon: <FaList /> },
  { name: 'Islands', icon: <FaTree /> }, // Using FaTree as a placeholder for islands
  { name: 'Vip', icon: <FaCrown /> },
  { name: 'Farms', icon: <FaTractor /> },
  { name: 'Earth homes', icon: <FaLeaf /> },
  { name: 'Beachfront', icon: <FaUmbrellaBeach /> },
  { name: 'Amazing pools', icon: <FaSwimmingPool /> },
  { name: 'Castles', icon: <FaFortAwesome /> },
]
