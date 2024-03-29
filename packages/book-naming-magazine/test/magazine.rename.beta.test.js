import { rename } from '../src/rename'
import { says } from "@spare/logger";

const CANDIDATES = [
  'Abitare__aprile_2022',
  'Abitare__dicembre_2022',
  'Abitare__febbraio_2023',
  'Abitare__giugno_2023',
  'Abitare__luglio_2023',
  'Abitare__maggio_2023',
  'Abitare__marzo_2023',
  'Abitare__novembre_2022',
  'Airports_International_-_Issue_3_2023',
  'Air_International_-_April_2023',
  'Air_International_-_August_2023',
  'Air_International_-_December_2022',
  'Air_International_-_February_2023',
  'Air_International_-_January_2023',
  'Air_International_-_July_2023',
  'Air_International_-_June_2023',
  'Air_International_-_March_2023',
  'Air_International_-_May_2023',
  'Air_International_-_October_2023',
  'Air_International_-_September_2023',
  'AN_Interior_-_Spring-Summer_2023',
  'Architectural_Digest_India_-_July_2023',
  'Architectural_Digest_USA_-_June_2023',
  'Architectural_Record_-_June_2023',
  'Architecture_amp_amp_Design_-_July-August_2023',
  'Architecture_Magazine_-_August-September_2023',
  'a_u_Architecture_and_Urbanism_a_u__24314__31689__12392__37117__24066__12288_-_April_2023',
  'a_u_Architecture_and_Urbanism_a_u__24314__31689__12392__37117__24066__12288_-_December_2022',
  'a_u_Architecture_and_Urbanism_a_u__24314__31689__12392__37117__24066__12288_-_February_2023',
  'a_u_Architecture_and_Urbanism_a_u__24314__31689__12392__37117__24066__12288_-_January_2023',
  'a_u_Architecture_and_Urbanism_a_u__24314__31689__12392__37117__24066__12288_-_March_2023',
  'a_u_Architecture_and_Urbanism_a_u__24314__31689__12392__37117__24066__12288_-_May_2023',
  'Barche_Magazine_-_Agosto_2021',
  'Barche_Magazine_-_Aprile_2020',
  'Barche_Magazine_-_Giugno_2021',
  'Barche_Magazine_-_Luglio_2021',
  'Barche_Magazine_-_Luglio_2022',
  'Barche_Magazine_-_Ottobre_2021',
  'Barche_Magazine_-_Settembre_2021',
  'British_GQ_-_June_2023',
  'British_GQ_-_October_2023',
  'British_GQ_-_September_2023',
  'British_Vogue_-_October_2023',
  'Building_Innovations_-_August_2023',
  'Casabella_-_Dicembre_2022',
  'Casabella__aprile_2021',
  'Casabella__febbraio_2023',
  'Casabella__gennaio_2023',
  'Casabella__giugno_2023',
  'Casabella__maggio_2023',
  'Casabella__marzo_2023',
  'Casabella__novembre_2022',
  'Casabella__settembre_2022',
  'DDB_Design_Diffusion_Bagno__dicembre_2022',
  'DDB_Design_Diffusion_Bagno__giugno_2022',
  'DDB_Design_Diffusion_Bagno__marzo_2023',
  'DDB_Design_Diffusion_Bagno__settembre_2022',
  'Digital_Camera_World_-_Issue_267_Spring_2023',
  'Elle_Decor_Italia_English_Edition_-_February_2022',
  'Elle_Decor_Italia_English_Edition_-_May_2022',
  'Elle_Decor_Italia_English_Edition_-_May_2023',
  'Food_amp_amp_Wine_USA_-_October_2023',
  'Garmany_Magazine_-_Fall-Winter_2023',
  'GQ_India_-_June_2023',
  'GQ_USA_-_June_2023',
  'GUNS_The_Italian_Way_-_Issue_9_-_August_2023',
  'Home_Italia_-_Aprile-Settembre_2023',
  'Home_Italia_USA_-_July-December_2023',
  'Interni_Italia__aprile_2021',
  'Interni_Italia__aprile_2022',
  'Interni_Italia__dicembre_2021',
  'Interni_Italia__febbraio_2022',
  'Interni_Italia__gennaio_2022',
  'Interni_Italia__giugno_2021',
  'Interni_Italia__maggio_2021',
  'Interni_Italia__maggio_2022',
  'Interni_Italia__ottobre_2021',
  'Interni_Italia__settembre_2021',
  'Radical_Magazine_-_August_2023',
  'Robb_Report_Singapore__April_2022',
  'Robb_Report_Singapore__August_2022',
  'Robb_Report_Singapore__December_2022',
  'Robb_Report_Singapore__January_2022',
  'Robb_Report_Singapore__January_2023',
  'Robb_Report_Singapore__July_2022',
  'Robb_Report_Singapore__June_2022',
  'Robb_Report_Singapore__March_2022',
  'Robb_Report_Singapore__May_2022',
  'Robb_Report_Singapore__November_2022',
  'Robb_Report_Singapore__October_2022',
  'Robb_Report_Singapore__September_2022',
  'Robb_Report_USA_-_April_2022',
  'Robb_Report_USA_-_August_2022',
  'Robb_Report_USA_-_December_2022',
  'Robb_Report_USA_-_February_2023',
  'Robb_Report_USA_-_June_2022',
  'Robb_Report_USA_-_March_2022',
  'Robb_Report_USA_-_May_2022',
  'Robb_Report_USA_-_November_2022',
  'Robb_Report_USA_-_October_2022',
  'Robb_Report_USA_-_September_2022',
  'Sail_-_October_2023',
  'The_Local_Palate_-_September_2023',
  'The_Woodworker_-_October_2023',
  'The_World_of_Hospitality_-_Issue_54_2023',
  'Total_Film_Annual_-_Volume_6_-_28_September_2023',
  'Vanity_Fair_UK_-_April_2023',
  'Vanity_Fair_UK_-_July_2023',
  'Vanity_Fair_UK_-_June_2023',
  'Vanity_Fair_UK_-_September_2023',
  'Vanity_Fair_USA_-_June_2023',
  'Wallpaper_-_August_2023',
  'Wallpaper_-_July_2023',
  'Wallpaper_-_June_2023',
  'Wallpaper_-_May_2023',
  'Wallpaper_-_September_2023',
  'Wired_UK_-_July_2023',
  'Wired_UK_-_March_2023',
  'Wired_UK_-_May_2023',
  'Wired_UK_-_September-October_2023',
  'Wired_USA_-_April_2023',
  'Wired_USA_-_February_2023',
  'Wired_USA_-_June_2023',
  'Wired_USA_-_March_2023',
  'Wired_USA_-_May_2023',
  'Wired_USA_-_September_2023',
  'Yachts_International_-_Fall_2023',
  'Yachts_International__April_2022',
  'Yachts_International__April_2023',
  'Yachts_International__August_2022',
  'Yachts_International__February_2023',
  'Yachts_International__January_2023',
  'Yachts_International__March_2023',
  'Yachts_International__November_2022',
  'Yachts_International__October_2022',
  'Yachts_International__September_2022',
]

const test = () => {
  for (let text of CANDIDATES) {
    const result = rename(text)
    says[text](result)
  }
}

test()