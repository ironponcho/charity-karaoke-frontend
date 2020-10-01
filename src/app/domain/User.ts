interface User {
  name: string;
  id: string;
  karaokeId: string;
  isAdmin: boolean;
  token: string;
}

interface UserInbound {
  name: string;
  id: number;
  tokenType: string;
  accessToken: string;
  roles: string[];
}
