import moment from 'moment';
import 'moment/locale/de';
import './styles/app.scss';
import './build/antd.css';
import './build/tailwind.css';


moment.locale('de', {
  week: {
    dow: 1,
  },
});
