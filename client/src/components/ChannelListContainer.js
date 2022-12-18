import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    .loading-text {
        background: #333;
        padding: 20px;
        font-size: 14px;
    }
    .loading-text{
        color: #ccc;
    }
    @media screen and (max-width: 960px){
        width: 200%;
     }
`

export default function ChannelListContainer({loading,children}){
    const loadingText = "Channels loading...."

    return(
        <Container>
            {loading? <div className='loading-text'>{loadingText}</div> : children}
        </Container>
    );
}