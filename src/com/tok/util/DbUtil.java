package com.tok.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;




public class DbUtil {

    private static Connection connection = null;

    public static Connection getConnection() {
        if (connection != null)
            return connection;
        else {
            try {
               // Properties prop = new Properties();
               // InputStream inputStream = DbUtil.class.getClassLoader().getResourceAsStream("/db.properties");
               // prop.load(inputStream);
            	// ssh -f -N exozet@app1.castaclip.net -L 9999:10.0.79.2:5432
                String driver = "org.postgresql.Driver";//prop.getProperty("driver");
                //String url = "jdbc:postgresql://127.0.0.1:9999/postgres"; //prop.getProperty("url");
                String url = "jdbc:postgresql://10.0.79.2:5432/postgres";
                String user = "foo";//prop.getProperty("user");
                String password = "foo"; //prop.getProperty("password");
                try {
					Class.forName(driver);
				} catch (ClassNotFoundException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
                connection = DriverManager.getConnection(url, user, password);
         /*   } catch (ClassNotFoundException e) {
                e.printStackTrace();
            } catch (SQLException e) {
                e.printStackTrace();
            } catch (FileNotFoundException e) {
                e.printStackTrace();*/
            } catch (SQLException e) {
                e.printStackTrace();
            }
            return connection;
        }

    }
}