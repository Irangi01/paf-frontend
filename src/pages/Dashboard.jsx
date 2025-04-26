import { Container } from '@mui/material';
import CommunityList from '../components/CommunityList';

export default function Dashboard() {
  return (
    <Container maxWidth="lg">
      <CommunityList />
    </Container>
  );
}