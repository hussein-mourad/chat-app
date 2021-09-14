import type { NextPage } from "next";
import { ReactElement, useEffect } from "react";
import { io } from "socket.io-client";
import { MainLayout } from "../components";

const Home: NextPage = (): ReactElement => {
  useEffect(() => {
    const socket = io();

    socket.on("connect", () => {
      console.log(`connect ${socket.id}`);
    });

    return () => {};
  }, []);
  return (
    <MainLayout title={"Front-end development"}>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
        consequuntur sunt exercitationem, incidunt nisi doloribus optio.
        Consequatur error odit distinctio? Laborum numquam natus laboriosam
        porro dolores consectetur inventore enim reprehenderit! Quis harum
        sapiente ex voluptates, consequuntur facere maxime suscipit officia!
        Temporibus eius cum unde culpa quas! Tempore sint illo quisquam,
        doloremque suscipit aspernatur exercitationem saepe ullam veniam dolore
        illum nesciunt. Deserunt, nam? Consequuntur modi enim quibusdam, doljr
        vero atque. Labore, delectus. Delectus, illum maxime! Odio commodi,
        eveniet magni magnam exercitationem earum veniam fugiat cupiditate nisi,
        voluptatum sed, quasi porro error. Illo perspiciatis vitae esse odio.
        Possimus quo sint dolores laudantium perspiciatis aliquam! Similique
        nulla doloribus cum mollitia autem eveniet, ratione temporibus soluta
        atque pariatur vitae ex provident dicta recusandae maiores. Itaque earum
        minima voluptates debitis omnis ipsam libero qui assumenda officia vel
        nobis facilis incidunt possimus pariatur sequi voluptate eveniet natus,
        dolorem praesentium voluptas! Quis perferendis molestias odio asperiores
        dignissimos. Aut dicta sapiente autem tempore molestias? Quis voluptate
        facere neque id ex, ratione voluptatum nulla beatae fugiat provident ab
        sapiente hic enim placeat optio sed fuga atque maxime natus velit! Vitae
        obcaecati perferendis odit optio voluptatum id necessitatibus assumenda
        minus, dolor, illum quia cumque incidunt recusandae ex nulla dolorem
        quis? Sit, sed minima distinctio ad neque dolorum explicabo consectetur
        eos. Atque necessitatibus eum perferendis qui rerum itaque voluptates
        nam facilis! Optio reprehenderit, nihil, aliquam, alias eligendi sunt
        minus eum vero quibusdam dolorum atque. Quis harum quibusdam cum minus,
        accusantium expedita! Unde vel neque laudantium deleniti consequatur et
        cupiditate at ipsam. Voluptates velit nemo quisquam! A, quaerat suscipit
        dolorem quae cumque, dolore maiores inventore incidunt, doloribus unde
        sapiente recusandae vero ratione. Animi, libero, dolorum cumque ipsa sit
        odio magni reprehenderit porro eius aperiam hic illum iste molestiae est
        repudiandae error dolores reiciendis nam labore nesciunt blanditiis.
        Vero, ea officiis? Deleniti, excepturi. Accusantium nisi beatae, ipsum
        voluptates quo, quod soluta eligendi quasi voluptatem nobis dolore
        excepturi consectetur mollitia molestiae debitis totam nulla itaque
        facilis, vitae ratione aspernatur aliquam. Est illo nobis deleniti. Quos
        voluptatem obcaecati incidunt illum, sit odit illo, ipsa eius minus
        iusto asperiores magni nostrum delectus in nam dolorem unde. Labore
        expedita suscipit voluptates impedit quam qui fugit provident
        repudiandae! Pariatur voluptates excepturi quae, assumenda fugit ullam?
        Dicta, quaerat ducimus, sequi non in inventore illum eos atque facere
        voluptates explicabo amet eum rerum corporis maiores. Vitae tempora
        corrupti quo perferendis! Reiciendis consequuntur ipsa architecto
        veritatis similique dolores sed? Officiis mollitia veniam atque
        blanditiis ipsum. Libero modi veniam mollitia aliquid, sint officia
        saepe maxime fuga nulla asperiores, facilis, sed pariatur recusandae.
        Veritatis autem impedit voluptatibus ut ipsum quo, non sint quisquam ea
        reiciendis nam quod. Qui repellendus, exercitationem voluptatem dicta
        beatae vel expedita! Eaque alias aperiam velit error fugiat
        reprehenderit a? Facilis impedit velit sapiente similique veniam,
        mollitia quaerat inventore minus excepturi voluptatem, voluptates
        voluptatum beatae hic incidunt fuga fugiat! Distinctio eum natus quasi
        iure eveniet maiores ipsum voluptate, perferendis veritatis. Culpa
        doloremque velit eum aliquam? Tenetur aliquid unde saepe doloremque,
        obcaecati sed ab in quaerat deleniti sit officiis ipsum. Beatae corporis
        quod, praesentium laborum impedit amet tempora eligendi. Aliquid,
        debitis? Laboriosam, eligendi commodi odit repellat ab non, eveniet quod
        incidunt quia facilis, sapiente tenetur vel sed? Quidem, non vitae in
        autem corporis esse libero magni qui nostrum, nihil amet itaque!
        Repellendus culpa molestiae magnam optio alias possimus iusto facere sed
        quis id. Nisi dolorum dicta illum quo, explicabo nulla assumenda quasi,
        excepturi nemo ut commodi sapiente? Omnis quia officia porro. Velit
        perferendis exercitationem reiciendis rerum odio, inventore ipsam? Porro
        nihil voluptatem dolores animi ab, sit est esse corrupti fuga,
        consequuntur tempora necessitatibus. Quam sint, magni excepturi nobis
        vitae modi atque! Dolorum assumenda expedita itaque vero! Nesciunt
        consequatur dolor quibusdam ipsa at iste fuga tenetur, cum tempore
        velit. Nostrum amet ipsam facilis commodi, tenetur voluptate accusamus
        nobis dolore ipsa, assumenda quae! Possimus, modi facilis maiores
        adipisci provident aspernatur quae magni mollitia distinctio cumque
        aliquid quod dicta omnis soluta temporibus non blanditiis libero
        corrupti ab repudiandae? Ad perferendis debitis non facilis odit!
        Maiores soluta ipsa, dolorum vel ex placeat in tenetur ipsam facere
        dolore fugiat atque corrupti blanditiis incidunt. Sapiente, accusamus
        corrupti rem, amet minima cumque necessitatibus accusantium soluta culpa
        aspernatur quis? Atque porro ut ea ducimus sequi quos consequuntur,
        magnam doloribus nisi obcaecati dolor dolorum minima architecto! Modi at
        cumque minima quas adipisci. Architecto iste nulla voluptatem, nesciunt
        inventore quo vitae! Ratione officiis aperiam quasi aliquid eveniet,
        blanditiis pariatur et incidunt obcaecati praesentium vero eos,
        aspernatur doloribus explicabo. Eligendi quos illo sint voluptatem
        necessitatibus? Eos, soluta nesciunt quae libero recusandae voluptatem.
        Aspernatur, dolore atque. Magni aperiam quidem eum nisi voluptas
        explicabo, suscipit obcaecati expedita praesentium odio, repudiandae sit
        impedit ea maxime at quod nulla voluptatum quo possimus ratione ex
        cupiditate id. Est debitis doloremque suscipit tempore voluptatem quia
        optio aliquid harum sit, illum labore corrupti quisquam quod corporis
        officiis iusto qui quasi. Labore nobis accusamus provident repellat vel
        fuga odit consectetur. Facilis, obcaecati! Architecto ab veritatis vero
        dolores. Repudiandae quidem, at nesciunt debitis distinctio porro
        corrupti officia facilis numquam cum beatae culpa ducimus maiores
        consequatur facere aperiam veritatis amet ad aliquid? Fuga consectetur
        ipsum, illo id dolorem alias fugiat fugit? Et magni, tempore eos
        provident perferendis soluta veritatis cum eum quas ea quis ipsa ratione
        consectetur obcaecati pariatur neque necessitatibus ab! Dolorem quam
        reprehenderit quasi quis suscipit accusamus veniam provident, numquam
        laudantium nihil impedit qui reiciendis vitae natus hic molestiae
        incidunt illum velit odit voluptates totam sequi aut? Aliquid, incidunt
        excepturi.
      </p>
    </MainLayout>
  );
};

export default Home;
