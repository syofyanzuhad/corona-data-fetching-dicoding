function main() {
    // const baseUrl = "https://api.kawalcorona.com/";
    const baseUrl = "https://corona.lmao.ninja/v2/countries";

    const getData = () => {
        fetch(`${baseUrl}`)
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                if (responseJson.error) {
                    showResponseError(responseJson.message);
                } else {
                    renderAll(responseJson);
                }
            })
            .catch(error => {
                showResponseError(error);
            })
    };

    const searchData = (country) => {
        // console.log(country);
        fetch(`${baseUrl}/`+country)
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                if (responseJson.error) {
                    showResponseError(responseJson.message);
                } else {
                    renderOne(responseJson);
                }
            })
            .catch(error => {
                showResponseError(error);
            })
    };

    function ConvertUnix(UNIX_Timestamp) {
        let date = new Date(UNIX_Timestamp);
        return ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ' ' + ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ';
    }

    const renderOne = (data) => {
        const listCountry = document.querySelector("#listCountry");
        listCountry.innerHTML = "";

        const forEach = item => {
            console.log(item);

            listCountry.innerHTML += `
                <div class="col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center" style="margin-top: 12px;">
                    <div class="card">
                        <div class="card-header text-center">
                            <h5>ID : ${item.countryInfo.iso3} | ${item.country}</h5>
                        <div
                        <div class="card-body">
                            <p> <i> updated : ${ConvertUnix(item.updated)} </i></p>
                                <table class="table table-striped table-inverse table-responsive">
                                    <thead class="thead-inverse">
                                        <tr>
                                            <td colspan="4"> Kasus </td>
                                        </tr>
                                        <tr>
                                            <td> <b class="text-warning">Aktif</b> </td>
                                            <td> <b class="text-success">Sembuh</b> </td>
                                            <td> <b class="text-danger">Meninggal</b> </td>
                                            <td> <b>Jumlah</b> </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="text-warning" scope="row">${item.active}</td>
                                            <td class="text-success"> ${item.recovered} </td>
                                            <td class="text-danger"> ${item.deaths} </td>
                                            <td> <span>${item.cases}</span </td>
                                        </tr>
                                    </tbody>
                                </table>
                        </div>
                        <div class="cad-footer">
                            <p>source : <a href="https://www.worldometers.info/coronavirus/"> <i>worldometers.info/coronavirus</i> </a></p>
                        </div>
                    </div>
                </div>
            `;
        };
        forEach(data);
    };


    const renderAll = (data) => {
        const listCountry = document.querySelector("#listCountry");
        listCountry.innerHTML = "";

        data.forEach( (item) => {
            // console.log(item);
            let x = document.getElementById("country");
            let option = document.createElement("option");
            option.text = `${item.country}`;
            option.value = `${item.country.toLocaleLowerCase()}`;
            x.add(option, x[0]);

            listCountry.innerHTML += `
                <div class="col-lg-4 col-md-6 col-sm-12" style="margin-top: 12px;">
                    <div class="card">
                        <div class="card-body">
                            <h5>ID : ${item.countryInfo.iso3} | ${item.country}</h5>
                            <p> <i> updated : ${ConvertUnix(item.updated)}</p>
                            <p>Jumlah kasus : <span class="text-danger"> ${item.cases}</span></p>
                        </div>
                    </div>
                </div>
            `;

        });

    };

    const showResponseError = (message = "Check your internet connection") => {
        alert(message);
    };

    document.addEventListener("DOMContentLoaded", () => {

        const country = document.querySelector("#country");
        const buttonSearch = document.querySelector("#buttonSearch");

        if (country.value == null) {
            getData();
        } else {
        buttonSearch.addEventListener("click", function () {
            const countrySelected = country.value;
                searchData(countrySelected);
            });
        }
        getData();
    });
}

export default main;
