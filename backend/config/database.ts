import {join} from 'path'

export default ({ env }) => ({
  connection: {
    client: 'sqlite',
    connection: {
      filename: join(__dirname, '..', '..', env('DATABASE_FILENAME', '.tmp/data.db')),
    },
    useNullAsDefault: true,
  },
});
