import React, { useState, useRef  } from "react"
import { FormGroup, Label, Input, FormText, Table, Button } from "reactstrap"
import readXlsxFile from "read-excel-file"

const UploadForm = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [dataTable, setDataTable] = useState([]);

    const fileRef = useRef(null); 

    const handleFileChange = (e) => {
        console.log(e.target.files[0]);
        setSelectedFile(e.target.files[0]);
    };

    const whatsappUrlCreator = (phoneNumber,pureUrl) => {
        if(phoneNumber) {
            const formattedNumber = phoneNumber.substring(1);
            const fixNumber = "62" + formattedNumber;

            // const urlEncoded = encodeURIComponent(pureUrl)
            const urlEncoded = encodeURIComponent(pureUrl);

            let message = `Salam%20Sejahtera%20untuk%20kita%20semua..%0ASelamat%20Malam%20Komandan%2C%20Senior%20dan%20Rekan-rekan%20terhormat%0A%0AKami%20yang%20berbahagia%2C%20mengundang%20Saudara%2FSaudari%20untuk%20hadir%20di%20acara%20pernikahan%20kami%20melalui%20undangan%20online%20yang%20kami%20persembahkan%20sebagai%20berikut%20%3A%0A%0A${urlEncoded}%0A%0ARegards%2C%0ARhesa%20Daiva%20Bremana%20Ginting%0AOriettha%20Deany%20br.%20Lumbantoruan%0A%0A%0A`;
            console.log(message, 'message');

            let url = `https://api.whatsapp.com/send?phone=${fixNumber}&text=${message}`;
            return url;

        }
    };

    const handleResetData = () => {
        setDataTable([]);
    }

    const handleFileUpload = () => {
        const schema = {
            "Nama": {
                prop: "nama",
                type: String,
                required: true
            },
            "HP": {
                prop: "no_hp",
                type: String,
                required: true
            }
        }

        readXlsxFile(selectedFile, { schema }).then((result) => {
            setDataTable(result.rows);
        })

    };

    const fileInfo = () => {
        if (dataTable) {
            return (
              <div className="mt-5">
                <Table bordered responsive striped>
                  <thead>
                    <tr className="text-center">
                      <th>No</th>
                      <th>Nama</th>
                      <th>No HP</th>
                      <th>URL Undangan</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataTable.map((items, key) => {


                       let url = `https://rhesa-oriettha.vercel.app/?to=${encodeURIComponent(items.nama)}`;
                       let pureUrl = `https://rhesa-oriettha.vercel.app/?to=${items.nama}`;

                       let waUrl = `https://api.whatsapp.com/send?phone=6281234567890&text=Saya%20tertarik%20untuk%20membeli%20produk%20ini%20segera.`;
                       
                       return (    
                        <tr key={key + 1}>
                            <th scope="row" className="text-center">{key + 1}</th>
                            <td>{items.nama}</td>
                            <td>{items.no_hp}</td>
                            <td>{url}</td>
                            <td className="text-center">
                                <Button size="sm" style={{marginRight:"20px"}} color="success" onClick={() => {navigator.clipboard.writeText(url)}}>Url Undangan</Button>
                                <Button size="sm" color="primary" onClick={() => {window.open(whatsappUrlCreator(items.no_hp, url),'_blank')}}>Url Whatsapp</Button>
                            </td>
                            {/* <td>{url}</td> */}
                        </tr>
                        )
                    })}
                  </tbody>
                </Table>
              </div>
            )
        }
    }

    // useEffect(() => {
    //     setSelectedFile(null);
    // }, [dataTable])

    return (
        <div className="mt-5">
            <FormGroup>
                {/* <Label for="exampleFile">File</Label> */}
                <Input id="uploadExcel" ref={fileRef} name="file" type="file" onChange={handleFileChange}/>
                <FormText>
                File yang diperbolehkan adalah file type Excel (.xlsx)
                </FormText>
            </FormGroup>
            <div>
                <Button color="primary" onClick={handleFileUpload}>Upload</Button>
                <Button color="danger" onClick={handleResetData} style={{marginLeft:"5px"}}>Reset</Button>
            </div>
            {fileInfo()}
        </div>
    )
}


export default UploadForm;