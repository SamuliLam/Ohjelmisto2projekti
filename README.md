# OptiFly 1.6
Ohjemisto 2 kurssin loppuprojekti. Projektissa on käytetty Ohjelmisto 1 projektin pohjaa ja siihen on lisätty web-käyttöliittymä sekä uudistettuja toimintoja.  Pelissä pelaaja kiertää kymmenen satunnaisesti arvottua lentokenttää mahdollisimman lyhyttä reittiä käyttäen. Pelaajalle määritetään aloitus- ja lopetuspisteet. Web-käyttöliittymän kartassa sininen merkki vastaa pelaajan nykyistä sijaintia, punainen määränpäätä, vihreät lentokenttiä joihin ei olla vielä lennetty ja harmaat jo läpi käytyjä lentokenttiä. Jokaiselta lentokentältä näytetään käyttöliittymässä myös niiden senhetkiset säätiedot. Kun pelaaja on päässyt määränpäähän, käyttöliittymä tulostaa pelaajalle matkaan kuluneen kilometrimäärän. 

## Ohjeet ohjelmiston käyttöön:

Aja tietokannan luontiskripti (tietokantaskripti.sql)

env.example-tiedosto pitää muuttaa siten, että sen nimi on vain .env. Seuraavien kenttien tiedot tulee täyttää niin, että ne sopivat oman tietokannan käyttöön:

DB_USER=exampleUser  
DB_PASSWORD=examplePassword  
DB_HOST=exampleHost  
DB_PORT=123456  
DB_DATABASE=example  
OPENWEATHERMAP_API_KEY=example  

## Ohjelmassa käytettävät Python-kirjastot:
- flask
- dotenv
- geopy
  
## Etusivu
<img width="958" alt="indexpage" src="https://github.com/SamuliLam/Ohjelmisto2projekti/assets/36449245/79c3272d-7e2b-42c2-9eb2-f3c15cbaa0f3">

## Vaikeustasot
<img width="960" alt="difficultypage" src="https://github.com/SamuliLam/Ohjelmisto2projekti/assets/36449245/57c50fbc-7e79-4706-be7f-bb626d46a9bc">

## Pelisivu
<img width="946" alt="gamepage" src="https://github.com/SamuliLam/Ohjelmisto2projekti/assets/36449245/4661666c-974c-44e8-9959-eb1c6eedaa0e">

## Pelin loppuminen
<img width="944" alt="ending" src="https://github.com/SamuliLam/Ohjelmisto2projekti/assets/36449245/856008e9-288e-476f-bd19-f926078c1e41">


