/* eslint-disable @next/next/no-img-element */
import { ArrowBackIos, ExpandMore, Search } from "@material-ui/icons";
import { ReactElement } from "react";
import Input from "./Input";
interface Props {
  text: string;
}

export default function Drawer({ text }: Props): ReactElement {
  return (
    <aside className="relative flex flex-col w-full h-full bg-base-300">
      <div className="px-5 navbar shadow-navbar min-h-[55px] sm:min-h-16">
        <button className="mr-3">
          <ArrowBackIos />
        </button>
        <h1 className="text-lg font-bold">{text}</h1>
      </div>

      <div className="mb-[55px] sm:mb-16 h-full overflow-auto scrollbar-hidden p-5">
        <p>
          <Input
            placeholder="Search"
            left={<Search style={{ margin: "8px", color: "white" }} />}
          />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
          repellat in perferendis perspiciatis, corporis vel voluptatum
          obcaecati culpa dolorum nesciunt illum saepe quo iusto recusandae
          quisquam officiis, nobis id odit. Dolorum pariatur velit minus totam
          dolor officiis cupiditate molestiae sint maiores! Voluptates mollitia
          ducimus aliquam temporibus vero reiciendis praesentium nobis ullam.
          Doloribus at tempore consequuntur reiciendis ex vel necessitatibus
          sint. Consectetur impedit ipsam excepturi enim similique tenetur
          consequuntur eum corrupti quia, distinctio fuga beatae fugit adipisci,
          asperiores sed accusantium iusto assumenda hic dicta nobis unde modi?
          Consectetur eos ab beatae? Dolorem odit, voluptatibus dolore nemo
          totam obcaecati quidem autem inventore ab incidunt soluta laboriosam
          quasi ullam, suscipit est in, doloribus fugit. Consectetur accusamus
          similique unde sapiente placeat fugit incidunt culpa. Optio, at! At,
          nesciunt ea sint eos atque nostrum. Exercitationem incidunt sed
          dolorem consequuntur quas aliquid ullam dignissimos recusandae
          accusamus at perspiciatis nostrum totam sapiente possimus provident,
          quae libero sit. Nostrum neque iste ratione quibusdam ipsam ad placeat
          quaerat praesentium aperiam asperiores ducimus deserunt natus,
          nesciunt quam officia eum corporis quisquam porro, nobis corrupti
          dolore inventore debitis. Temporibus, ipsam eaque? Suscipit
          dignissimos maiores ipsam, a facilis itaque deserunt dolorum alias
          maxime iusto nobis labore! Aperiam dolorem eum veniam eligendi ab
          consequatur, aut porro aspernatur magnam assumenda consectetur modi
          dicta deleniti! Nostrum fugiat itaque saepe perspiciatis repellendus
          ipsam quaerat quas corrupti excepturi earum voluptas explicabo et
          ratione nemo amet commodi aspernatur, ad nam aliquam nihil ullam
          dolorem molestias! Porro, optio inventore. Quas delectus aspernatur
          consequuntur quis aliquam possimus illum dolorum alias voluptates!
          Ratione deserunt harum culpa placeat ullam repudiandae inventore, quia
          assumenda! Voluptatibus perspiciatis dolorum sint molestias voluptatum
          ipsam ea fuga. Perspiciatis magnam dolore nulla illum eligendi,
          tempora tenetur omnis, aperiam cum similique ad optio, voluptates
          ratione amet necessitatibus repudiandae consectetur. Similique
          reiciendis, consectetur assumenda accusantium dignissimos impedit modi
          reprehenderit tenetur! Fugiat facilis dolorem, in voluptates minima
          odit animi tempore veniam architecto sed, iusto, labore esse qui quos
          delectus ab ducimus. Quos nulla sit perspiciatis ducimus corporis
          tempore mollitia. Voluptatum, eos. Laudantium nobis nesciunt doloribus
          eos cupiditate repellendus soluta aliquam veniam minima id incidunt ea
          nam, adipisci deserunt numquam sapiente officia accusantium aperiam
          saepe ab. Quis maxime similique ut quidem dolore. Tenetur, perferendis
          beatae. Velit numquam voluptates voluptate provident accusamus, vero
          repudiandae explicabo iure veniam unde maxime vel, sunt et debitis
          nemo soluta nisi eum quod suscipit labore quia dicta voluptas!
          Pariatur provident dolores voluptate voluptatum voluptates! Ex eos,
          qui numquam amet nesciunt vero doloribus quas aperiam dicta quae
          distinctio ea recusandae itaque impedit inventore voluptates
          consequatur. Mollitia ipsa hic libero. Magni, possimus harum. Ea velit
          dignissimos sed debitis maxime adipisci quam, delectus, beatae
          molestias exercitationem consectetur inventore nihil! Perferendis
          tempore consectetur voluptate cum, quis reiciendis nesciunt explicabo
          sequi molestias. Inventore. Deserunt excepturi ducimus ad laudantium
          sit sequi esse quisquam fugit dicta neque recusandae, nobis ipsam quis
          totam exercitationem accusamus. Id soluta repudiandae tempore minus
          reprehenderit neque! Velit ad inventore voluptates! Itaque, cum enim
          fuga vel doloribus nemo. Iure autem ex, amet quidem voluptatibus sit
          quasi, accusamus corrupti at totam nobis tempore porro ipsum. Hic,
          quaerat in molestias fuga ullam aliquam. Autem asperiores labore quod
          voluptatibus iste sunt soluta aliquam eveniet ducimus temporibus,
          consequatur doloremque consequuntur accusantium quisquam culpa non.
          Ipsum, voluptas! Ab magnam blanditiis a vero maxime consequatur
          repudiandae quibusdam. Dolore, iusto! Nulla odit commodi ex, dolore
          veritatis nobis praesentium neque distinctio magni, quae dolorem esse
          vero recusandae doloribus obcaecati laborum iure voluptate
          perspiciatis eum quasi. Ea facilis possimus aliquid? Rerum, eaque
          sequi facilis exercitationem ab saepe soluta! Odit beatae, sint dolor
          pariatur debitis perferendis voluptatibus nesciunt vitae maxime
          consequatur fugit corporis rem accusantium iusto ex fugiat quos hic
          laborum. Saepe incidunt veritatis voluptate aperiam, aliquam adipisci
          unde veniam officia voluptas harum fugiat natus ipsa deleniti, illo
          nesciunt dolorem, nulla molestias at facere fuga nobis. Voluptates
          laboriosam tempora mollitia! Quisquam! Dolorum odit, molestiae placeat
          earum nesciunt fugit est corrupti ipsum facilis, nam, ex reiciendis
          tempora neque reprehenderit et asperiores amet. Dicta itaque aut vel
          ex a. Dolore sed doloribus quaerat. Quos sequi minima doloribus
          obcaecati eius reiciendis dignissimos esse blanditiis quidem, quo
          consectetur vero consequatur eaque praesentium illo dolore, accusamus
          iusto quae inventore, et omnis ratione ipsum tempora unde. Numquam.
          Quisquam, molestiae minima optio, laboriosam dolorum molestias
          praesentium dolor maxime voluptatem alias, aspernatur ratione at esse
          fugiat non. Labore similique quae laborum temporibus, hic nam qui sint
          porro tempora iure. Architecto reiciendis maiores ipsum, quam
          reprehenderit possimus delectus aperiam. Quibusdam, officia,
          repellendus impedit quisquam facilis reprehenderit optio similique
          ipsam nemo non consequatur quos maxime, nesciunt suscipit dolores.
          Optio, dolores veniam. Deserunt voluptatibus, iusto quis odio
          perspiciatis incidunt reiciendis eum numquam voluptates quod, suscipit
          quaerat nesciunt labore saepe asperiores. Culpa tempora laboriosam
          repudiandae doloribus esse dignissimos. Beatae assumenda culpa fuga
          voluptate? Sed dolor obcaecati amet, nihil provident rem
          necessitatibus beatae, rerum dolorem libero optio vel voluptas
          adipisci dolore. Odio earum dolorem possimus impedit inventore veniam
          incidunt perspiciatis quo eveniet, illum ipsa. Velit, alias. Excepturi
          adipisci libero, quis corporis, nulla ab suscipit quam eveniet amet
          ipsa dolor optio eaque rem perferendis ut iste. At mollitia adipisci
          error vero. Repellat sed perspiciatis odio. Ducimus sit autem
          distinctio, natus harum est ex laudantium quia facere magnam inventore
          totam! Incidunt alias repudiandae ea perspiciatis exercitationem optio
          numquam, ipsum ullam odio velit quibusdam quod labore esse? Dolorem,
          debitis! Sit quia aliquam voluptates ad! Modi quam ab natus fugit
          deserunt tempora rerum, voluptatibus esse inventore sed autem
          obcaecati quae praesentium quis excepturi ea non eligendi. Aut, velit!
        </p>
      </div>

      <div className="absolute bottom-0 left-0 justify-between navbar shadow-navbar-top min-h-[55px] sm:min-h-16 w-full">
        <img src="" alt="" />
        <h1 className="text-lg font-bold">{text}</h1>
        <button className="mr-3">
          <ExpandMore />
        </button>
      </div>
    </aside>
  );
}

{
  /* <div className="justify-between navbar shadow-navbar min-h-[55px] sm:min-h-16 w-full px-5">
        <h1 className="text-lg font-bold">{text}</h1>
        <button className="btn btn-sm btn-secondary btn-square ">
          <Add />
        </button>
</div> */
}
