import Image from "next/image";
import styles from "./page.module.css";
import Auth from "../pages/Auth"

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
      <div className={styles.div_for_gap}>
        <Image
          src="/icons8-croissant-96 1.png"
          width={50}
          height={50}
          alt="Picture of the author"/>
        <a href="/">
          <h1 className={styles.h1}>
            СhatteRidée
          </h1>
        </a>
      </div>
        <div className={styles.box_in_header}>
        <a href="/Basket">
          <p>
            Кошик
          </p>
        </a>
        <a href="/Category">
          <p>
            Меню
          </p>
        </a>
        <div>
  <a href="/Reg">Зареєструватись</a>
  <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
  {/* <span onClick={Auth}>Авторизуватись</span> */}
  <a onClick={Auth}>Авторизуватись</a>
</div>
        </div>
      </div>
      <div className={styles.conteiner}>
        <h1>
          Вітаємо вас!
        </h1>
        <hr className={styles.hr_line}/>
        <h3>
          Смачного!
        </h3>
      </div>
      <div>
        <p className={styles.p}>
        Ласкаво просимо до «СhatteRidée», унікального французького ресторану, де кулінарна елегантність поєднується з теплою атмосферою. Наше різноманітне меню, приготоване зі свіжих високоякісних продуктів, пропонує вишукані страви, які задовольнять найвибагливіші смаки. Приходьте та насолодіться незабутніми гастрономічними враженнями у комфортній та вишуканій обстановці.
        </p>
      </div>
    </main>
  );
}
