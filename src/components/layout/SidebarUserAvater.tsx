const SidebarUserAvater = ({
  profileImage,
  userName,
}: {
  profileImage: string | undefined;
  userName: string | undefined;
}) => {
  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        rowGap: "10px",
      }}
    >
      <div
        style={{
          width: "150px",
          height: "150px",
          border: "5px solid #1e90ff",
          borderRadius: "50%",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
            borderRadius: "50%",
          }}
          src={profileImage || "/admin.jpg"}
          alt={userName}
        />
      </div>

      <h2 style={{ color: "#f5f6fa" }}>{userName}</h2>
    </div>
  );
};

export default SidebarUserAvater;
