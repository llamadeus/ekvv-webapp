import { DAYS } from 'app/constants/schedule';
import PropTypes from 'prop-types';


export const DayShape = PropTypes.oneOf(Object.values(DAYS));
