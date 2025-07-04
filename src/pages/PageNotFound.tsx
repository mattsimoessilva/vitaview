import Header from '../components/Header/Header';
import MainContainer from '../components/MainContainer/MainContainer';
import Footer from '../components/Footer/Footer';
import NotFound from '../components/NotFound/NotFound';
import ContentArea from '../components/ContentArea/ContentArea';
function PageNotFound() {

    return (
        <>
            <Header />
            < MainContainer >
               
                    <NotFound message="Oops! We couldn't find that page." />
               
            </MainContainer>
           
        </>
    );
}

export default PageNotFound;
