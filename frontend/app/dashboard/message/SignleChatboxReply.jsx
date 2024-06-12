import Image from "next/image";

const SignleChatboxReply = () => {
  const replyContent = [
    {
      id: 1,
      message: `こんにちは。`,
      reply: <></>,
    },
    {
      id: 2,
      message: `貴重な時間をいただき、ありがとうございました。
      今後ともよろしくお願いいたします。`,
      reply: (
        <>
          <div className="media reply first">
            <div className="media-body text-right">
              <div className="date_time">今日, 10:35</div>
              <p>引き続きよろしくお願いします。</p>
            </div>
          </div>
        </>
      ),
    },
    {
      id: 3,
      message: `修正をお願いします。`,
      reply: (
        <>
          <div className="media reply">
            <div className="media-body text-right">
              <div className="date_time">今日, 10:35</div>
              <p>ありがとうございます。再度検討をさせていただきます。</p>
            </div>
          </div>
        </>
      ),
    },
    {
      id: 4,
      message: `貴重な時間をいただき、ありがとうございました。
      今後ともよろしくお願いいたします。`,
      reply: <></>,
    },
    {
      id: 5,
      message: `こんにちは。`,
      reply: <></>,
    },
    {
      id: 6,
      message: `貴重な時間をいただき、ありがとうございました。
      今後ともよろしくお願いいたします。`,
      reply: (
        <>
          <div className="media reply first">
            <div className="media-body text-right">
              <div className="date_time">今日, 10:35</div>
              <p>引き続きよろしくお願いします。</p>
            </div>
          </div>
        </>
      ),
    },
    {
      id: 7,
      message: `こんにちは。`,
      reply: (
        <>
          {" "}
          <div className="media reply">
            <div className="media-body text-right">
              <div className="date_time">今日, 10:35</div>
              <p>ありがとうございます。再度検討をさせていただきます。</p>
            </div>
          </div>
        </>
      ),
    },
    {
      id: 8,
      message: `貴重な時間をいただき、ありがとうございました。
      今後ともよろしくお願いいたします。`,
      reply: (
        <>
          <div className="media reply first">
            <div className="media-body text-right">
              <div className="date_time">今日, 10:35</div>
              <p>引き続きよろしくお願いします。</p>
            </div>
          </div>
        </>
      ),
    },
    {
      id: 9,
      message: `こんにちは。`,
      reply: (
        <>
          {" "}
          <div className="media reply">
            <div className="media-body text-right">
              <div className="date_time">今日, 10:35</div>
              <p>ありがとうございます。再度検討をさせていただきます。</p>
            </div>
          </div>
        </>
      ),
    },
    {
      id: 10,
      message: `貴重な時間をいただき、ありがとうございました。
      今後ともよろしくお願いいたします。`,
      reply: <></>,
    },
  ];

  return (
    <>
      {replyContent.map((user) => (
        <li className="media sent" key={user.id}>
          <span className="contact-status busy"></span>
          <Image
            width={57}
            height={57}
            className="img-fluid align-self-start mr-3"
            src="/assets/images/team/s6.jpg"
            alt="s6.jpg"
          />
          <div className="media-body">
            <div className="date_time">今日, 10:51</div>
            <p>{user.message}</p>
          </div>

          {user.reply}
        </li>
      ))}
    </>
  );
};

export default SignleChatboxReply;
