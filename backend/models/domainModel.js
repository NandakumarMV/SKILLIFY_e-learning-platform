import mongoose from "mongoose";

const domainSchema = mongoose.Schema({
  domainName: {
    type: String,
  },
});

const Domain = mongoose.model("Domain", domainSchema);
export default Domain;
