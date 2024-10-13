import './App.css'
import { Admin, Resource, defaultTheme } from "react-admin";
import {authProvider} from "./authProvider";
import {dataProvider} from "./dataProvider";
import topCategory from "./page/top-category";
import mainCategory from "./page/main-category";
import subCategory from "./page/sub-category";
import lowCategory from "./page/low-category";
import materials from "./page/materials";
import colors from "./page/colors";
import brand from "./page/brand";
import indigo from '@mui/material/colors/indigo';
import pink from '@mui/material/colors/pink';
import red from '@mui/material/colors/red';
import { i18nProvider } from './i18nProvider';

const myTheme = {
    ...defaultTheme,
    palette: {
        mode: 'dark',
        primary: indigo,
        secondary: pink,
        error: red,
    },
    typography: {
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Arial',
            'sans-serif',
        ].join(','),
    },
    components: {
        ...defaultTheme.components,
        MuiTextField: {
            defaultProps: {
                variant: 'outlined' as const,
            },
        },
        MuiFormControl: {
            defaultProps: {
                variant: 'outlined' as const,
            },
        },
    },
};


function App() {
    return (
      <Admin authProvider={authProvider} dataProvider={dataProvider} i18nProvider={i18nProvider} theme={myTheme}>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/*// @ts-ignore*/}
          <Resource options={{ label: 'Категория' }}  name="admin/category/top" {...topCategory} />
          <Resource options={{ label: 'Подкатегория' }}  name="admin/category/main" {...mainCategory} />
          <Resource options={{ label: 'Вид' }}  name="admin/category/sub" {...subCategory} />
          <Resource options={{ label: 'Подвид' }}  name="admin/category/low" {...lowCategory} />
          <Resource options={{ label: 'Бренд' }}  name="admin/brand" {...brand} />
          <Resource options={{ label: 'Материалы' }}  name="admin/material" {...materials} />
          <Resource options={{ label: 'Цвета' }}  name="admin/colors" {...colors} />
          {/*<Resource options={{ label: 'Active users' }} name="user/active-users/consultation" {...activeUsers} />*/}
          {/*<Resource name="user" {...user} />*/}
          {/*<Resource name="conclusion" {...conclusion} />*/}
      </Admin>
  )
}

export default App
