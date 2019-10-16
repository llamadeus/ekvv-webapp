import { isWebapp } from 'app/utils/app';
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

if (isWebapp()) {
  let lastTouchEnd = 0;

  document.addEventListener('touchmove', (event) => {
    if (event.scale !== 1) {
      event.preventDefault();
    }
  }, false);

  document.addEventListener('touchend', (event) => {
    const now = (new Date()).getTime();

    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }

    lastTouchEnd = now;
  }, false);
}
