import React from "react";
import { Container } from "reactstrap";
import UploadForm from "../components/UploadForm";

const Home = () => {
    return (
        <div className="mt-5">
            <Container>
                  <h1 className="text-center">Rhesa & Oriettha Invitation Generator</h1>
                
                <UploadForm />  
            </Container>
        </div>
    )
}

export default Home;