const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');
const pdftable = require('voilab-pdf-table')

module.exports = {
  sendEmail: async (email, description, qrCode, objTicket) => {
    try {
      // Create a document
      const doc = new PDFDocument(),
        table = new pdftable(doc, {
          bottomMargin: 30
        });
      // Pipe its output somewhere, like to a file or HTTP response
      // See below for browser usage
      const pdfBuffers = [];
      const qrCodePng = Buffer.from(qrCode.split("base64,")[1], "base64");
      doc.on('data', pdfBuffers.push.bind(pdfBuffers));
      doc.on('end', () => {
        let pdfFile = Buffer.concat(pdfBuffers);
        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'creativentindonesia@gmail.com',
            pass: 'CreativentHacktiv8'
          }
        });

        let message = {
          from: 'Creativent',
          to: email,
          subject: 'Event Ticket Confirmation',
          html: `
              <div>Hai, Kami dari Creativent !!</div>
              <br />
              <p> Anda telah menerima tiket pesanan Anda. Have fun!! </p>
              <div style="background-color:orange;text-align:center;margin-top:20px;border-radius:10px">
                <img src="cid:qrCodeCID" style="width:300px;margin:20px;border-radius:10px"/>
              </div>
            `,
          attachments: [
            {
              filename: 'E-ticket.pdf',
              contentType: 'application/pdf',
              content: pdfFile
            },
            {
              filename: 'ticket-QRCode.png',
              content: qrCodePng,
              cid: "qrCodeCID"
            },
          ]
        };

        transporter.sendMail(message, (err, info) => {
          if (err) throw err;
        });
      })

      // Embed a font, set the font size, and render some text
      doc
        // .font('fonts/PalatinoBold.ttf')
        .fontSize(25)
        .text(`
        Creativent Teams !!
        
        `, 25, 25);
        // Tiket ini sebagai bukti tanda masuk ke 
        // event ${objTicket.title}
        // tanggal ${objTicket.date}
        // jam ${objTicket.time}
        // di ${objTicket.location}
      // .font('fonts/PalatinoBold.ttf')
      doc
        .font('Times-Bold')
        .fontSize(20)
        .text(`
        Dear, ${objTicket.first_name}
        `, {
          width: 150,
          align: 'left'
        })
      doc
        .fontSize(20)
        .text(` `)
      doc
        .fontSize(20)
        .text(`
        Tiket ini sebagai tanda bukti untuk masuk ke acara
        `)
      table
        .addPlugin(new (require('voilab-pdf-table/plugins/fitcolumn'))({
          column: 'description'
        }))
        .setColumnsDefaults({
          headerBorder: 'B',
          align: 'right'
        })
        .addColumns([
          {
            id: "description",
            header: "Event",
            align: "left"
          },
          {
            id: "date",
            header: "Date",
            align: "left",
            width: 100
          },
          {
            id: "time",
            header: "Time",
            align: "left",
            width: 80
          },
          {
            id: "location",
            header: "Location",
            align: "left",
            width: 100
          }
        ])
      table
        .addBody([
          { description: `${objTicket.title}`, date: `${objTicket.date}`, time: `${objTicket.time}`, location: `${objTicket.location}` }
        ])
        // Add an image, constrain it to a given size, and center it vertically and horizontally
        .setColumnsDefaults({
          headerBorder: 'B',
          align: 'right'
        })
      // doc.image(qrCodePng, {
      //   fit: [180, 180],
      //   // align: 'super-left',
      //   // valign: 'super-left'
      // });
      // doc.
      //   page.width - fit / 2
      doc.image(qrCodePng, (doc.page.width - 200) /2 )
      // Add another page
      // doc
      //   .addPage()
      //   .fontSize(25)
      //   .text('Here is some vector graphics...', 100, 100);

      // Draw a triangle
      // doc
      //   .save()
      //   .moveTo(100, 150)
      //   .lineTo(100, 250)
      //   .lineTo(200, 250)
      //   .fill('#FF3300');

      // Apply some transforms and render an SVG path with the 'even-odd' fill rule
      doc
        .scale(0.6)
        .translate(470, -380)
        .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
        .fill('red', 'even-odd')
        .restore();

      // Add some text with annotations
      // doc
      //   .addPage()
      //   .fillColor('blue')
      //   .text('Here is a link!', 100, 100)
      //   .underline(100, 100, 160, 27, { color: '#0000FF' })
      //   .link(100, 100, 160, 27, 'http://google.com/');

      // Finalize PDF file
      doc.end();

    } catch (error) {
      console.log(error);
    }
  }
}
