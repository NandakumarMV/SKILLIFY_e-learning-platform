import React, { useEffect, useState } from "react";
import DomainTable from "./DomainTable";
import axios from "axios";

import { useDispatch } from "react-redux";
import { setDomains } from "../../slices/domainSlice";

const DomainList = () => {
  const dispatch = useDispatch();
  const getDomain = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/domains", {
        withCredentials: true,
      });
      const domains = res.data;
      const domainNames = domains.map((domain) => domain.domainName);
      dispatch(setDomains(domainNames));
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
      <DomainTable />
    </div>
  );
};

export default DomainList;
