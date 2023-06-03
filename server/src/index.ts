import { createServer } from 'http';
import { config } from 'dotenv';
import { yoga } from './graphql';
import { connectToDB } from './config';

config();
connectToDB();

const PORT = process.env.PORT || 4000;
const server = createServer(yoga);

server.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT} 🚀`);
});
