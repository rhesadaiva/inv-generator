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
            const encodedUrl = encodeURIComponent(pureUrl);

            let message = `Shalom%2C%20salam%20sejahtera%20untuk%20kita%20semua.%20%0A%0ATanpa%20mengurangi%20rasa%20hormat%2C%20melalui%20media%20ini%2C%20izinkan%20kami%20mengundang%20Bapak%2FIbu%2FSaudara%2Fi%2Fteman-teman%20sekalian%2C%20untuk%20berkenan%20hadir%20dalam%20acara%20Pemberkatan%20Pernikahan%20%26%20Adat%2FResepsi%20kami%3B%0A%0Arincian%20acara%3A%0A${encodedUrl}%0A%0AKami%20memohon%20maaf%20karena%20keterbatasan%20jarak%20dan%20waktu%2C%20tidak%20dapat%20mengirimkan%20undangan%20ini%20secara%20langsung.%20%0A%0AAtas%20kehadiran%20dan%20doa%20restunya%2C%20kami%20beserta%20keluarga%20menyampaikan%20terimakasih.%20%0AKiranya%20Tuhan%20memberkati%20kita%20semua.%20%0A%0AKami%20yang%20berbahagia%2C%20%0ARhesa%20%26%20Oriettha`;
            console.log(message, 'message');

            let url = `https://api.whatsapp.com/send?phone=${fixNumber}&text=${message}`;
            return url;

        }
    };


    const generateMessageOnly = (url) => {
        return `Shalom, salam sejahtera untuk kita semua.\n\nTanpa mengurangi rasa hormat, melalui media ini, izinkan kami mengundang Bapak/Ibu/Saudara/i/teman-teman sekalian, untuk berkenan hadir dalam acara Pemberkatan Pernikahan & Adat/Resepsi kami;\n\nrincian acara:\n${url}\n\nKami memohon maaf karena keterbatasan jarak dan waktu, tidak dapat mengirimkan undangan ini secara langsung.\n\nAtas kehadiran dan doa restunya, kami beserta keluarga menyampaikan terimakasih. \nKiranya Tuhan memberkati kita semua. \n\nKami yang berbahagia,\nRhesa & Oriettha`
    }

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
                    //    let url = `https://rhesa-oriettha.vercel.app/?to=${items.nama.replace(/\s/g,"+")}`;

                       return (    
                        <tr key={key + 1}>
                            <th scope="row" className="text-center">{key + 1}</th>
                            <td>{items.nama}</td>
                            <td>{items.no_hp}</td>
                            <td>{url}</td>
                            <td className="text-center">
                                <Button size="sm" style={{marginRight:"5px"}} color="success" onClick={() => {navigator.clipboard.writeText(url)}}>Url Undangan</Button>
                                <Button size="sm" style={{marginRight:"5px"}} color="primary" onClick={() => {window.open(whatsappUrlCreator(items.no_hp, url),'_blank')}}>Url Whatsapp</Button>
                                <Button size="sm" color="info" onClick={() => {navigator.clipboard.writeText(generateMessageOnly(url))}}>Pesan Whatsapp</Button>
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