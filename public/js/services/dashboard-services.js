angular.module('americanExperian').service('DashboardService', function ($http) {
    


    /*ADM - VOUCHERS GENEREATED*/
    this.VoucherAdmGenerated = function () {
        return $http.get("/dashboard/adm");

    };

     /*ADM - Total de Offers*/
    this.AdmTotalOffers = function () {
        return $http.get("/dashboard/admoffers");

    };

      /*ADM - Vouchers valided*/
    this.AdmVouchersValided = function () {
        return $http.get("/dashboard/admvouchersvalided");

    };

        /*ADM - Vouchers Expired*/
    this.AdmExpiredVouchers = function (partner_id) {
        return $http.get("/dashboard/admexpiredvouchers");

    };

     /*PARTNER - Vouchers Generated*/
    this.VoucherPartnerGenerated = function (partner_id) {
        return $http.get("/dashboard/partnerVouchersGenerated/"+partner_id);

    };
      /*PARTNER - Vouchers valided*/
    this.PartnerTotalVouchersValided = function (partner_id) {
        return $http.get("dashboard/partnerTotalVouchersValided/"+partner_id);

    };


      /*PARTNER -Expired Vouchers*/
    this.PartnerExpiredVouchers = function (partner_id) {
        return $http.get("/dashboard/partnerExpiredVouchers?partner_id="+partner_id);

    };

       /*PARTNER -Total Offers*/
    this.PartnerTotalOffers = function (partner_id) {
        return $http.get("/dashboard/partnerTotalOffers?partner_id="+partner_id);

    };


    
   

    


   





});