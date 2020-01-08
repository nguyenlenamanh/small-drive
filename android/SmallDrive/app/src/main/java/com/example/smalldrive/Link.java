package com.example.smalldrive;

import androidx.annotation.NonNull;

public class Link {
    private int id;
    private String link;
    private String title;

    public Link(int id, String link, String title) {
        this.id = id;
        this.link = link;
        this.title = title;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @NonNull
    @Override
    public String toString() {
        return this.title;
    }
}
