import InputWithIcon from '@/components/molecules/InputWithIcon';
import { useQuery } from '@apollo/client';
import { GET_CONTACT_LIST } from '../../api/gql';
import { FaSearch } from 'react-icons/fa';
import styled from '@emotion/styled';

const Container = styled.div`
  padding: 30px 20px;
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_CONTACT_LIST);
  console.log(data?.contact);
  return (
    <Container>
      <InputWithIcon
        icon={<FaSearch className="icon" />}
        placeholder="Search . . . "
      ></InputWithIcon>
      <h1>Hello world</h1>
    </Container>
  );
}
