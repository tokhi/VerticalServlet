package com.tok.model;

import java.util.Date;

public class ClipMeta {
	private int id;
	private String title;
	private String description;
	private String thumb;
	private Date date;
	
	public ClipMeta(){
		
	}
	public ClipMeta(int id, String title, String description,Date date, String thumb,String url ){
		this.id = id;
		this.title = title;
		this.description = description;
		this.thumb = thumb;
		this.date = date;
		this.url = url;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getThumb() {
		return thumb;
	}
	public void setThumb(String thumb) {
		this.thumb = thumb;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	private String url;
	

}
