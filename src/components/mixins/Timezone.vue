<script>
import moment from 'moment';

export default {
  name: 'MixinTimezone',
  methods: {
    TimezoneFormatIndonesia(date) {
      const timezone = new Date(date).getTimezoneOffset();
      switch (Number(timezone) / 60) {
        case -7: return `${moment(date).format('HH.mm')} WIB`;
        case -8: return `${moment(date).format('HH.mm')} WITA`;
        case -9: return `${moment(date).format('HH.mm')} WIT`;
        default: return `${moment(date).format('HH.mm')}`;
      }
    },
    CurrentDate() {
      const currentDate = new Date();
      const currentDateWithoutTime = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        0, // hours
        0, // minutes
        0, // seconds
        0, // milliseconds
      );
      return currentDateWithoutTime;
    },
    ConvertTimezone(location) {
      switch (location) {
        case 'Daerah Khusus Ibukota Jakarta':
          return 'WIB';
        case 'Banten':
          return 'WIB';
        case 'Daerah Istimewa Yogyakarta':
          return 'WIB';
        case 'Jawa Barat':
          return 'WIB';
        case 'Jawa Tengah':
          return 'WIB';
        case 'Jawa Timur':
          return 'WIB';
        case 'Kalimantan Barat':
          return 'WIB';
        case 'Kalimantan Tengah':
          return 'WIB';
        case 'Aceh':
          return 'WIB';
        case 'Bengkulu':
          return 'WIB';
        case 'Jambi':
          return 'WIB';
        case 'Kepulauan Bangka Belitung':
          return 'WIB';
        case 'Kepulauan Riau':
          return 'WIB';
        case 'Lampung':
          return 'WIB';
        case 'Riau':
          return 'WIB';
        case 'Sumatera Barat':
          return 'WIB';
        case 'Sumatera Selatan':
          return 'WIB';
        case 'Sumatera Utara':
          return 'WIB';
        case 'Kalimantan Utara':
          return 'WITA';
        case 'Kalimantan Selatan':
          return 'WITA';
        case 'Kalimantan Timur':
          return 'WITA';
        case 'Bali':
          return 'WITA';
        case 'Nusa Tenggara Barat':
          return 'WITA';
        case 'Nusa Tenggara Timur':
          return 'WITA';
        case 'Gorontalo':
          return 'WITA';
        case 'Sulawesi Barat':
          return 'WITA';
        case 'Sulawesi Selatan':
          return 'WITA';
        case 'Sulawesi Tengah':
          return 'WITA';
        case 'Sulawesi Tenggara':
          return 'WITA';
        case 'Sulawesi Utara':
          return 'WITA';
        case 'Maluku':
          return 'WIT';
        case 'Maluku Utara':
          return 'WIT';
        case 'Papua' || 'Papua Barat':
          return 'WIT';
        case 'Papua Barat':
          return 'WIT';
        case 'Papua Barat Daya':
          return 'WIT';
        case 'Papua Pegunungan':
          return 'WIT';
        case 'Papua Selatan':
          return 'WIT';
        case 'Papua Tengah':
          return 'WIT';
        default:
          return '';
      }
    },
  },
};
</script>
