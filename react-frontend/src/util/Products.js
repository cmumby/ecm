export default class Products {
    getCurrentProducts(){
        let currentProducts = [
            "PD228: ACH Origination",
            "PD234: Branch Services",
            "PDF: CREDIT",
            "PD236: DESKTOP DEPOSIT/ELECTRONIC CHECK",
            "PD251: GENERAL ACCOUNT SERVICES",
            "PD242: GENERAL DISBURSMENT SERVICES",
            "PD358: GLOBAL CHECK CLEARING",
            "P33: LINES OF CREDIT",
            "P34 LOANS",
            "P111: MERCHANT PAYMENT SOLLUTIONS"

        ];

        return currentProducts;
    }
    getUserProducts(){
        let userProducts = [
            "P34: LOANS",
            "PD364: 1031 EXCHANGE SERVICES",
            "PD126: 15C3-3 DEPOSIT",
            "P140: ABF SALES AND TRADING",
            "PD410: ABS",
            "PD239: ACCOUNT RECONCILEMENT",
            "PD255: ACCOUNT VALIDATION SERVICES",
            "PD228: ACH Origination",
            "PD229: ACH CASH CONCENTRATION",
            "PD230: ACH FRAUD FILTER"
        ];

        return userProducts;
    }
}
