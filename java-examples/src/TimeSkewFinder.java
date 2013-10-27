import java.util.Calendar;


public class TimeSkewFinder {

	public static void main(String[] args) {
		long i = 0, s = 0;
		int current = 0;
		Calendar d = Calendar.getInstance();
		while (++i < Long.MAX_VALUE) {
			d.setTimeInMillis(i*1000);
			s = d.get(Calendar.SECOND);
			
			if (s >= 60) {
				System.out.println("FOUND >60 " + i);
			} else if (s == current) {
				System.out.println("FOUND REP " + i);
			} else if (s != 0 && current != 59 && s < current) {
				System.out.println("FOUND BACK PAST " + i);
			}
			if (i%100000000 == 0) {
				System.out.println(i + " " + d.get(Calendar.YEAR) +" "+ d.get(Calendar.MONTH) +" "+ d.get(Calendar.DAY_OF_MONTH) + "...");
			}
		}
	}

}
