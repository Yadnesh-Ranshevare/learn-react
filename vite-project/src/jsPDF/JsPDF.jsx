import React, { useRef } from 'react'
import html2canvas from "html2canvas"
import JsPDF from "jspdf"
import "./style.css"

export default function JsPDFGenerator() {
    const printRef = useRef()


    const generatePdf = async () => {
        const element = printRef.current
        console.log(element) 
        if(!element){
            console.log("element not found")
            return
        }   
        const canvas = await html2canvas(element)
        const data = canvas.toDataURL("image/png")

        const pdf = new JsPDF({
            orientation: "portrait",
            unit: "px",
            format: "a4"
        });

        const impProps = pdf.getImageProperties(data)


        const pdfWidth = pdf.internal.pageSize.getWidth() 
        const pdfHeight = (impProps.height * pdfWidth / impProps.width) 
        pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight)
        pdf.save("document.pdf")

        // console.log(pdfWidth,pdfHeight)
    }


  return (
    <>
        <div className="container">
            <div ref={printRef}>
                <h1>Welcome to PDF Generation Example</h1>
                <p>This is a random HTML content that will be converted into a PDF using jsPDF in a React application.</p>

                <h2>About jsPDF</h2>
                <p><span className="highlight">jsPDF</span> is a popular library that enables you to generate PDF documents directly from JavaScript code. It allows you to include text, images, and graphics, making it a great tool for creating reports, invoices, and more.</p>

                <h3>Features of jsPDF</h3>
                <ul>
                    <li>Generate PDFs directly from JavaScript.</li>
                    <li>Supports text, images, and vector graphics.</li>
                    <li>Can be integrated with frameworks like React, Angular, and Vue.</li>
                    <li>Download PDFs or save them to a server.</li>
                </ul>

                <h3>Example of HTML to PDF</h3>
                <p>When working with jsPDF in a web app, you can convert entire HTML pages or parts of it (such as specific div elements) into PDFs. This is particularly useful for exporting reports, receipts, and other documents.</p>

            </div>
        </div>
        <div className="footer">
            <button
                onClick={()=>generatePdf()} 
            >generate pdf </button>
        </div>
    </>
  )
}
