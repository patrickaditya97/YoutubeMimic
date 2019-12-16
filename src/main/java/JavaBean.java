import java.io.Serializable;

public class JavaBean implements Serializable
{
	private String empid;
	private String empstat;
	
	
	
	public String getEmpid() {
		return empid;
	}
	public void setEmpid(String empid) {
		this.empid = empid;
	}
	public String getEmpstat() {
		return empstat;
	}
	public void setEmpstat(String empstat) {
		this.empstat = empstat;
	}
	
	
	
}
