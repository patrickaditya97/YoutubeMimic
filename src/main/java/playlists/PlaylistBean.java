package playlists;

public class PlaylistBean 
{
	private String PlId;
	private String Pl_title;
	private String User_Id;
	private String status;
		
	public String getPlId() {
		return PlId;
	}
	public void setPlId(String plId) {
		PlId = plId;
	}
	public String getPl_title() {
		return Pl_title;
	}
	public void setPl_title(String pl_title) {
		Pl_title = pl_title;
	}
	public String getUser_Id() {
		return User_Id;
	}
	public void setUser_Id(String user_Id) {
		User_Id = user_Id;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String string) {
		this.status = string;
	}
	
}
