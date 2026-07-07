import { server } from './http';
import './websocket/ChatService';

const port = Number(process.env.PORT) || 3000;

server.listen(port, () => console.log(`Server is running on port ${port}`));   