export function getSectionStatuses(data){
    const {
        proxyRR,
        cip, 
        remediation, 
        relatedParties, 
        screening, 
        documentation,
        transportationSarf,
        hraEdd,
        qcChecklist,
        ousEntity,
        mmb 
    } = data;

    return {
      "proxyRR": proxyRR.sectionComplete,
      "cip": cip.sectionComplete,
      "remediation": remediation.sectionComplete,
      "relatedParties": relatedParties.sectionComplete,
      "screening": screening.sectionComplete,
      "documentation": documentation.sectionComplete,
      "transportationSarf": transportationSarf.sectionComplete,
      "hraEdd": hraEdd.sectionComplete,
      "qcChecklist": qcChecklist.sectionComplete,
      "ousEntity": ousEntity.sectionComplete,
      "mmb": mmb.sectionComplete
    }
}

