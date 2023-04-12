## Description
Program ini dibuat untuk menyelesaikan persoalan *Shortest Path Problem* menggunakan algoritma UCS dan A*. Program ini berupa single page web-application, yang menerima masukan berupa file atau masukan dari peta interaktif.

## Technologies Used
- React
- Tailwind
- Cytoscape
- Leaflet

## How to Run:
### Set-up
- Clone repository dengan ini menjalankan `git clone git@github.com:RMA1403/tucil3-13521134-13521149.git` pada terminal.
- Masuk ke dalam directory ini dengan command `cd tucil3-13521134-13521149`.
- Install node modules dengan menjalankan `npm i` pada directory root project ini.

### Run
- Jalankan `npm start` untuk menyalakan program.
- Buka browser dan masuk ke `localhost:3000` untuk mengakses halaman program.
- Pilih file konfigurasi graf atau gunakan mode map untuk memasukkan graf ke dalam program.

## Configuration File Format
Contoh file konfigurasi adalah sebagai berikut:
```
8
(1,3)
(4.1,0)
(-1,2)
(-3,-5.2)
(8,9.5)
(9.2,-4)
(3.1,5.1)
(-4,-5)

0 1 5 Melati
0 2 3 Mawar
2 3 4 Jambu
4 6 5 Manggis
5 6 12 Mangga
1 7 10 Belimbing
```
**Keterangan:**
- Baris pertama berisi nilai n, yaitu jumlah simpul yang akan ada dalam graph.
- Untuk n baris berikutnya, setiap baris mengikuti format `(long, lat)` dengan `long` dan `lat` yang menjelaskan posisi koordinat simpul tersebut.
- Untuk n baris berikutnya, setiap baris mengikuti format `i j w name` dengan `i` dan `j` menjelaskan simpul yang terhubung dengan sisi tersebut, `w` menjelaskan bobot dari simpul tersebut, dan `name` menjelaskan nama dari simpul/jalan tersebut.

## Author:
- Rinaldy Adin 13521134
- Rava Maulana Azzikri 13521149

## Struktur program
```
.
├── README.md
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── api
│   │   ├── Cytoscape.tsx
│   │   └── Leaflet.tsx
│   ├── classes
│   │   └── Graph.ts
│   ├── components
│   │   ├── App.tsx
│   │   ├── Button.tsx
│   │   ├── Dropdown.tsx
│   │   └── Dropzone.tsx
│   ├── functions
│   │   ├── AStar.ts
│   │   ├── UniformCostSearch.ts
│   │   └── Utility.ts
│   ├── index.css
│   ├── index.tsx
│   ├── logo.svg
│   ├── react-app-env.d.ts
│   └── tests
│       ├── itb.txt
│       ├── rumah.txt
│       └── test.txt
├── tailwind.config.js
└── tsconfig.json
```