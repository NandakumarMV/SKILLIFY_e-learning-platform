import React, { useEffect, useState } from "react";
import DomainTable from "./DomainTable";
import axios from "axios";

const DomainList = () => {
  const [domain, setDomin] = useState([]);

  const getDomain = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/domains", {
        withCredentials: true,
      });
      console.log(res.data);
      setDomin(res.data);
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  useEffect(() => {
    getDomain();
  }, []);

  return (
    <div>
      <h1 className="mb-5 font-semibold">Domains in Skillify</h1>
      <DomainTable domain={domain} />
    </div>
  );
};

export default DomainList;
