import Ejercicio1 from "./routes/Ejercicio1";
import Ejercicio2 from "./routes/Ejercicio2";

const PagesData = [
  {
    id: 'ejercicio1',
    title: 'Ejercicio 1',
    path: '/',
    component: <Ejercicio1 />,
    showOnSidebar: true
  },
  {
    id: 'ejercicio2',
    title: 'Ejercicio 2',
    path: '/ejercicio2',
    component: <Ejercicio2 />,
    showOnSidebar: true
  },
];
export default PagesData;