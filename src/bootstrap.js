import moment from 'moment';
import './styles/app.scss';
import './build/antd.css';
import './build/tailwind.css';


moment.locale('de', {
  week: {
    dow: 1,
  },
});
