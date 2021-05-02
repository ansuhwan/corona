import axios from "axios";

export const fetcher = (url) => axios.get(url).then((res) => res.data);

export const baseUrl = "https://api.covid19api.com/total/dayone/country";

export const options = {
    title: {
        display: true,
        text: "누적 확진자 추이",
        fontSize: 16,
    },
    legend: {
        display: true,
        position: "bottom", // label 숨기기
    },
    scales: {
        yAxes: [
            {
                ticks: {
                    min: 0, // 스케일에 대한 최솟갓 설정, 0 부터 시작
                    stepSize: 1, // 스케일에 대한 사용자 고정 정의 값
                },
            },
        ],
    },
    maintainAspectRatio: false, // false로 설정 시 사용자 정의 크기에 따라 그래프 크기가 결정됨.
};
