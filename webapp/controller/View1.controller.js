sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, MessageBox) {
        "use strict";
        return Controller.extend("modulename.controller.View1", {

            // 初期ロード時
            onInit: function () {
            },

            // テーブルデータ選択時
            onSelect: function (oEvent) {
                var sPath = oEvent.oSource._aSelectedPaths
                sPath = sPath[0].split("/")
                sPath = sPath[1]
                var myForm = this.getView().byId("cMyform")
                myForm.bindElement("/" + sPath)
                this.oPath = sPath
            },

            // 作成ボタン押下時
            oCreateEmpPopup: function () {
                if (!this.oFragment) {
                    this.oFragment = new sap.ui.xmlfragment("modulename.fragment.CreateForm", this)
                    this.getView().addDependent(this.oFragment)
                    this.oFragment.open()
                }
                else {
                    this.oFragment.open()
                }
            },
            // 作成ポップアップ作成ボタン押下時
            oCreateEmp: function () // FOR CREATING NEW RECORD ************
            {
                var UserId = sap.ui.getCore().byId('_IDGenInput1').getValue()
                var UserName = sap.ui.getCore().byId('_IDGenInput2').getValue()
                var UserAddress = sap.ui.getCore().byId('_IDGenInput3').getValue()
                var UserDes = sap.ui.getCore().byId('_IDGenInput4').getValue()
                var oAddEmpData = {}
                oAddEmpData.Empid = UserId
                oAddEmpData.Empname = UserName
                oAddEmpData.Empadd = UserAddress
                oAddEmpData.Empdes = UserDes
                this.getView().getModel().create("/EmployeeSet", oAddEmpData, {
                    method: "POST",
                    success: function (data) {
                        MessageToast.show("Employee Created Successfully");
                    },
                    error: function (data) {
                        MessageToast.show(data);
                    },
                });
            },
            // 作成ポップアップ閉じるボタン押下時
            oCloseButton: function () {
                this.oFragment.close()
                this.oFragment.destroy(true)
                this.oFragment = null
            },

            // 更新ボタン押下時
            oUpdateEmpPopup: function () {
                if (!this.oReadEmpFragment) {
                    this.oReadEmpFragment = new sap.ui.xmlfragment("modulename.fragment.ReadForm", this)
                    var myForm = sap.ui.getCore().byId("cFragmentMyform")
                    myForm.bindElement("/" + this.oPath)
                    this.getView().addDependent(this.oReadEmpFragment)
                    this.oReadEmpFragment.open()
                }
                else {
                    this.oReadEmpFragment.open()
                }
            },
            // 更新ポップアップ更新ボタン押下時
            oUpdateEmp: function () // FOR UPDATING RECORD *************
            {
                var UserId = sap.ui.getCore().byId('_IDGenInput1').getValue()
                var UserName = sap.ui.getCore().byId('_IDGenInput2').getValue()
                var UserAddress = sap.ui.getCore().byId('_IDGenInput3').getValue()
                var UserDes = sap.ui.getCore().byId('_IDGenInput4').getValue()
                var oAddEmpData = {}
                oAddEmpData.Empname = UserName
                oAddEmpData.Empadd = UserAddress
                oAddEmpData.Empdes = UserDes
                this.getView().getModel().update("/EmployeeSet('" + UserId + "')",
                    oAddEmpData, {
                    method: "PATCH",
                    success: function (data) {
                        MessageToast.show("Employee update Successfully with number");
                    },
                    error: function (data) {
                        MessageToast.show(data);
                    }
                });
            },
            // 更新ポップアップ閉じるボタン押下時
            oCloseReadButton: function () {
                this.oReadEmpFragment.close()
                this.oReadEmpFragment.destroy(true)
                this.oReadEmpFragment = null
            },

            // 削除ボタン押下時
            oDeleteEmp: function () // FOR DELETING RECORD **************
            {
                this.oPath
                this.getOwnerComponent().getModel().remove("/EmployeeSet('" + this.oPath.split("'")[1] + "')", {
                    method: "DELETE",
                    success: function (data) {
                        MessageToast.show("Customer deleted Successfully");
                    },
                    error: function (Error) {
                        sap.m.MessageToast.show(Error);
                    }
                });
            },

            // 検索ボタン押下時
            oSearchEmpPopup: function () {
                if (!this.SearchEmp) {
                    this.SearchEmp = new sap.ui.xmlfragment("modulename.fragment.SearchEmp", this)
                    this.getView().addDependent(this.SearchEmp)
                    this.SearchEmp.open()
                }
                else {
                    this.SearchEmp.open()
                }
            },
            // 検索ポップアップ検索ボタン押下時
            oReadEmp1: function ()
            {
                var SearchInp = sap.ui.getCore().byId("_IDGenInput1").getValue()
                this.getOwnerComponent().getModel().read("/EmployeeSet('" + SearchInp + "')", {
                    method: "GET",
                    success: function (data) {
                        MessageBox.success("ID :- " + data.Empid + " " + "Name :- " + data.Empname + " " + "Address :- " + data.Empadd);
                    },
                    error: function (Error) {
                        sap.m.MessageToast.show(Error);
                    }
                });
            },
            // 検索ポップアップ閉じるボタン押下時
            oCloseSearchButton: function () {
                this.SearchEmp.close()
                this.SearchEmp.destroy(true)
                this.SearchEmp = null
            }
        });
    });