import * as fs from "fs";
export default async function handler(req, res) {
  if (req.method == "POST") {
    const msg = JSON.parse(req.body);
    // console.log("req.body : ", JSON.parse(req.body));
    let data = [];
    let file;
    if (fs.existsSync("contactdata/contact.json")) {
      file = await fs.promises.readFile("contactdata/contact.json");
      data = JSON.parse(file);
    }
    // console.log(data);
    data.push(msg);
    // console.log(data);
    await fs.promises.writeFile(
      "contactdata/contact.json",
      JSON.stringify(data)
    );
    res.status(200).json("Success");
  } else {
    res.status(500).json("Failed");
  }
}
