// cargar las pages
import Home from '../pages/Home';
import Error404 from '../pages/Error404';
import User from '../pages/User';
import LayoutsBasic from '../layouts/LayoutBasic';

const routes = [
  {
    path:'/',
    Layout:LayoutsBasic,
    Component:Home,
    exact:true,
  },
  {
    path:'/:username',
    Layout:LayoutsBasic,
    Component:User,
    exact:true,
  },
  {
    Layout:LayoutsBasic,
    Component:Error404
  }
]
export {routes}
