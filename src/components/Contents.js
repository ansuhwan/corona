import React, { useEffect, useState } from "react";
// import useSWR from "swr";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { baseUrl, options } from "./URL/Fetcher";
import axios from "axios";

const Contents = ({ nameValue }) => {
    const [confirmedData, setConfirmedData] = useState({});
    const [quarantinedData, setQuarantinedData] = useState({});
    const [comparedData, setComparedData] = useState({});
    useEffect(() => {
        const fetchEvents = async () => {
            const res = nameValue
                ? await axios.get(
                      "https://api.covid19api.com/total/dayone/country/UA"
                  )
                : await axios.get(
                      "https://api.covid19api.com/total/dayone/country/kr"
                  );

            console.log(res.data);
            makeData(res.data);
        };
        const makeData = (items) => {
            const arr = items.reduce((acc, cur) => {
                const currentDate = new Date(cur.Date);
                const year = currentDate.getFullYear();
                const month = currentDate.getMonth();
                const date = currentDate.getDate();
                const confirmed = cur.Confirmed;
                const active = cur.Active;
                const death = cur.Deaths;
                const recovered = cur.Recovered;

                const findItem = acc.find(
                    (a) => a.year === year && a.month === month
                );

                if (!findItem) {
                    acc.push({
                        year,
                        month,
                        date,
                        confirmed,
                        active,
                        death,
                        recovered,
                    });
                }
                if (findItem && findItem.date < date) {
                    findItem.year = year;
                    findItem.month = month;
                    findItem.date = date;
                    findItem.confirmed = confirmed;
                    findItem.active = active;
                    findItem.death = death;
                    findItem.recovered = recovered;
                }

                return acc;
            }, []);
            const labels = arr.map((a) => `${a.month + 1}월`);
            setConfirmedData({
                labels,
                datasets: [
                    {
                        label: `${
                            nameValue ? "우크라이나" : "국내"
                        } 누적 확진자`,
                        backgroundColor: "salmon",
                        fill: true,
                        data: arr.map((a) => a.confirmed),
                    },
                ],
            });
            setQuarantinedData({
                labels,
                datasets: [
                    {
                        label: "월별 격리자 현황",
                        borderColor: "salmon",
                        fill: false,
                        data: arr.map((a) => a.active),
                    },
                ],
            });
            const last = arr[arr.length - 1];
            setComparedData({
                labels: ["확진자", "격리해제", "사망"],
                datasets: [
                    {
                        label: `누적 확진, 해제, 사망 ${
                            new Date().getMonth + 1
                        } 월`,
                        backgroundColor: ["#ff3d67", "#059bff", "#ffc233"],
                        borderColor: ["#ff3d67", "#059bff", "#ffc233"],
                        fill: false,
                        data: [last.confirmed, last.recovered, last.death],
                    },
                ],
            });
        };

        fetchEvents();
    }, [nameValue]);

    return (
        <section>
            <h2>{nameValue ? "우크라이나" : "국내"} 코로나 현황</h2>
            <div className="contents">
                <div>
                    <Bar
                        data={confirmedData}
                        width={300}
                        height={200}
                        options={options}
                    />
                </div>
                <div>
                    <Line
                        data={quarantinedData}
                        width={300}
                        height={200}
                        options={options}
                    />
                </div>
                <div>
                    <Doughnut
                        data={comparedData}
                        width={300}
                        height={200}
                        options={options}
                    />
                </div>
            </div>
        </section>
    );
};

export default Contents;
