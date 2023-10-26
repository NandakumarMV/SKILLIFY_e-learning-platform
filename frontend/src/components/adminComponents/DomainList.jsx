import React, { useEffect, useState } from "react";
import DomainTable from "./DomainTable";
import axios from "axios";
import { setDomain } from "../../slices/adminAuthSlice";
import { useDispatch, useSelector } from "react-redux";

const DomainList = () => {
  const dispatch = useDispatch();
  const getDomain = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/domains", {
        withCredentials: true,
      });
      console.log(res.data, "dataaaaaaaaaaa");
      const domains = res.data;
      const domainNames = domains.map((domain) => domain.domainName);
      console.log(domainNames, "dsagfggdfhk");
      dispatch(setDomain(domainNames));
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  useEffect(() => {
    getDomain();
  }, []);
  const domainsStore = useSelector((state) => state.adminAuth.domains);
  console.log(domainsStore, "domains in tableeeeeeeee");
  return (
    <div>
      <h1 className="mb-5 font-semibold">Domains in Skillify</h1>
      <DomainTable />
    </div>
  );
};

export default DomainList;
